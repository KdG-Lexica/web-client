import { Billboard, OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { Camera, Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BasicDocumentType from "../../../../types/BasicDocumentType";
import ChunkType from "../../../../types/ChunkType";
import MetaType from "../../../../types/MetaType";
import OperatorType from "../../../../types/OperatorType";
import QueryFilterDtoType from "../../../../types/QueryFilterType";
import Vector3Type from "../../../../types/Vector3Type";
import { Filter } from "../../../filter/Filter";
import AxisMesh from "./AxisMesh";
import CursorMesh from "./CursorMesh";
import InstancedChunkMesh from "./InstancedChunkMesh";
import InstancedDocumentMesh from "./InstancedDocumentMesh";
import InstancedWordMesh from "./InstancedWordMesh";

interface DefaultViewerCanvasProps {
    chunkDistance: number;
    size: number;
    documents: ChunkType[];
    words: BasicDocumentType[];
    scale: number;
    setClickedDocument: React.Dispatch<React.SetStateAction<BasicDocumentType | null>>;
    executeFilter: (filter: QueryFilterDtoType[]) => void;
    filterFields: MetaType[];
}

const operators = [
    {
        name: "contains",
        input: true,
        dateOperator: false
    },
    {
        name: "does not contain",
        input: true,
        dateOperator: false
    },
    {
        name: "equals",
        input: true,
        dateOperator: false
    },
    {
        name: "does not equal",
        input: true,
        dateOperator: false
    },
    {
        name: "is empty",
        input: false,
        dateOperator: false
    },
    {
        name: "is not empty",
        input: false,
        dateOperator: false
    },
    {
        name: "before",
        input: true,
        dateOperator: true
    },
    {
        name: "from",
        input: true,
        dateOperator: true
    },
    {
        name: "after",
        input: true,
        dateOperator: true
    }
];

const DefaultViewerCanvas = (props: DefaultViewerCanvasProps) => {
    const [hoveredDocument, setHoveredDocument] = useState<BasicDocumentType | null>(null);
    const [clusters, setClusters] = useState<ChunkType[]>([]);

    const [showScale, setShowScale] = useState(false);
    const [showAxis, setShowAxis] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [showingFilter, setShowingFilter] = useState(false);
    const [showingTimeline, setShowingTimeline] = useState(false);

    const camera = useRef<Camera>(new THREE.PerspectiveCamera());
    const controls = useRef<any>({target: {x: 0, y: 0, z: 0}});

    const [mouseDown, setMouseDown] = useState(false);
    const [cursorVector, setCursorVector] = useState<Vector3Type>({x: 0, y: 0, z: 0});
    const [cameraDistance, setCameraDistance] = useState<number>(props.scale);

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
        camera.current.position.set(props.scale / 2.5, props.scale / 2.5, props.scale / 2.5);

        window.addEventListener("storage", (event) => {
            checkTheme();
        });
    }, []);

    useEffect(() => {
        if(mouseDown) {
            setCursorVector(controls.current.target);
        }        
    }, [mouseDown, controls.current.target.x, controls.current.target.y, controls.current.target.z]);

    useEffect(() => {
        setCameraDistance(Math.sqrt(Math.pow(camera.current.position.x - controls.current.target.x, 2) + 
        Math.pow(camera.current.position.y - controls.current.target.y, 2) + 
        Math.pow(camera.current.position.z - controls.current.target.z, 2)));
        
    }, [camera.current.position.x, camera.current.position.y, camera.current.position.z]);

    useEffect(() => {
        setClusters(props.documents.filter(chunk => 
            chunk.vector.x >= Math.floor(cursorVector.x) - props.chunkDistance && chunk.vector.x <= Math.floor(cursorVector.x) + props.chunkDistance &&
            chunk.vector.y >= Math.floor(cursorVector.y) - props.chunkDistance && chunk.vector.y <= Math.floor(cursorVector.y) + props.chunkDistance &&
            chunk.vector.z >= Math.floor(cursorVector.z) - props.chunkDistance && chunk.vector.z <= Math.floor(cursorVector.z) + props.chunkDistance
        ));
    }, [cursorVector.x, cursorVector.y, cursorVector.z])

    function resetCamera() {
        camera.current.position.set(props.scale / 2.5, props.scale / 2.5, props.scale / 2.5);
        controls.current.target.set(0, 0, 0);
    }

    return (
        <div className="p-2 w-full h-full" style={{ maxHeight: "calc(100vh - 80px)" }}>
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
                                fields={props.filterFields}
                                operators={operators}
                                executeFilter={props.executeFilter}
                            />
                        </div>
                        <button className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2" onClick={() => { setShowingTimeline(!showingTimeline) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <div style={{ position: "absolute", left: "160px", top: "45px", zIndex: 999, display: showingTimeline ? "block" : "none" }}>

                        </div>
                    </div>
                </div>
                {hoveredDocument != null &&
                <div className="absolute bottom-0 z-50">
                    <div className="flex-row flex justify-start items-stretch space-x-2s">
                        <p className="font-sans dark:text-white black:text-black font-medium text-xl p-2">{hoveredDocument.name}</p>
                    </div>
                </div>
                }
                <div style={{ width: "100%", height: "100%"}} onMouseDown={() => {setMouseDown(true);}} onMouseUp={() => {setMouseDown(false);}} onScrollCapture={() => {console.log("scrolling");
                }}>
                <Canvas style={{ width: "100%", height: "100%", filter: isDarkTheme ? "invert(1)" : "" }}>
                    <ambientLight intensity={0.5} />
                    <PerspectiveCamera ref={camera} position={[props.scale / 2.5, props.scale / 2.5, props.scale / 2.5]} fov={50} makeDefault />
                    <OrbitControls ref={controls} enablePan={true} target={[0, 0, 0]} enableDamping={false}/>
                    {showAxis &&
                        <AxisMesh showScale={showScale} scale={props.scale} />
                    }
                    {props.documents.length > 0 && 
                        <InstancedDocumentMesh
                            pointSize={cameraDistance}
                            size={props.size}
                            documents={props.documents}
                            setHoveredDocument={setHoveredDocument}
                            setClickedDocument={props.setClickedDocument} />
                    }
                    {
                        clusters.map((chunk, index) => {                           
                            return (
                                <InstancedChunkMesh key={index}
                                pointSize={cameraDistance}
                                documents={chunk.rows}
                                setHoveredDocument={setHoveredDocument}
                                setClickedDocument={props.setClickedDocument}/>
                            )
                        })
                    }
                    <InstancedWordMesh
                        documents={props.words}
                        setHoveredDocument={setHoveredDocument} />

                    <CursorMesh vector3={cursorVector}/>

                    {/*hoveredDocument != null &&
                        <Billboard position={[hoveredDocument.vector3.x, hoveredDocument.vector3.y + 0.1, hoveredDocument.vector3.z]}>
                            <Text color="black" fontSize={0.1} outlineWidth={'5%'} outlineColor="white">
                                {hoveredDocument.name}
                            </Text>
                        </Billboard>
                    */}
                </Canvas>
                </div>
            </div>
        </div >
    );
}

export default DefaultViewerCanvas;