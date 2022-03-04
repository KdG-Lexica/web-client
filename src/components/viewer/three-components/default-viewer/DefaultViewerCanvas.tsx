import { Billboard, OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { Camera, Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BasicDocumentType from "../../../../types/BasicDocumentType";
import MetaType from "../../../../types/MetaType";
import QueryFilterDtoType from "../../../../types/QueryFilterType";
import { Filter } from "../../../filter/Filter";
import AxisMesh from "./AxisMesh";
import InstancedDocumentMesh from "./InstancedDocumentMesh";
import InstancedWordMesh from "./InstancedWordMesh";



const operators = [
    {
        name: "CONTAINS",
        input: true
    },
    {
        name: "EQUALS",
        input: true
    }
];


interface DefaultViewerCanvasProps {
    documents: BasicDocumentType[];
    words: BasicDocumentType[];
    scale: number;
    setClickedDocument: React.Dispatch<React.SetStateAction<BasicDocumentType | null>>;
    executeFilter: (filter: QueryFilterDtoType[]) => void;
    filterFields: MetaType[];
}

const DefaultViewerCanvas = (props: DefaultViewerCanvasProps) => {
    const [hoveredDocument, setHoveredDocument] = useState<BasicDocumentType | null>(null);
    const [showScale, setShowScale] = useState(false);
    const [showAxis, setShowAxis] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const camera = useRef<Camera>(new THREE.PerspectiveCamera());
    const controls = useRef<any>();
    const [showingFilter, setShowingFilter] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function checkTheme() {
            const theme = localStorage.getItem('color-theme');
            if (theme === "dark") {
                setIsDarkTheme(true);
            } else {
                setIsDarkTheme(false);
            }
        }

        checkTheme();

        window.addEventListener("storage", (event) => {
            checkTheme();
        });
    }, [])

    function resetCamera() {
        camera.current.position.set(props.scale / 2.5, props.scale / 2.5, props.scale / 2.5);
        controls.current.target.set(0, 0, 0);
    }

    return (
        <div className="p-2 w-full h-full" style={{ minHeight: "calc(100vh - 80px)" }}>
            <div className="flex flex-row bg-slate-100 dark:bg-neutral-900 h-full">
                <div className="absolute z-50">
                    <div className="max-h-9 flex-row flex justify-start items-stretch space-x-2s">
                        <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2" onClick={resetCamera}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2" onClick={() => { setShowAxis(!showAxis) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        </button>
                        <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2" onClick={() => { setShowScale(!showScale) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                        </button>
                        <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2" onClick={() => { setShowingFilter(!showingFilter); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </button>
                        <div style={{ position: "absolute", left: "120px", top: "45px", zIndex: 999, display: showingFilter ? "block" : "none" }}>
                            <Filter
                                fields={props.filterFields.map(metaData => metaData.key)}
                                operators={operators}
                                executeFilter={props.executeFilter}
                            />
                        </div>
                    </div>
                </div>
                <Canvas style={{ width: "100%", height: "100%", filter: isDarkTheme ? "invert(1)" : "" }}>
                    <ambientLight intensity={0.5} />
                    <PerspectiveCamera ref={camera} position={[props.scale / 2.5, props.scale / 2.5, props.scale / 2.5]} fov={50} makeDefault />
                    <OrbitControls ref={controls} enablePan={true} target={[0, 0, 0]} />

                    {showAxis &&
                        <AxisMesh showScale={showScale} scale={props.scale} />
                    }
                    <InstancedDocumentMesh
                        documents={props.documents}
                        setHoveredDocument={setHoveredDocument}
                        setClickedDocument={props.setClickedDocument} />
                    <InstancedWordMesh
                        documents={props.words}
                        setHoveredDocument={setHoveredDocument} />

                    {hoveredDocument != null &&
                        <Billboard position={[hoveredDocument.vector3.x, hoveredDocument.vector3.y + 0.1, hoveredDocument.vector3.z]}>
                            <Text color="black" fontSize={0.1} outlineWidth={'5%'} outlineColor="white">
                                {hoveredDocument.name}
                            </Text>
                        </Billboard>
                    }
                </Canvas>
            </div>
        </div >
    );
}

export default DefaultViewerCanvas;