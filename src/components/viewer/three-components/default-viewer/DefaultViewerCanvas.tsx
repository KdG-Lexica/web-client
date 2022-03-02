import zIndex from "@mui/material/styles/zIndex";
import { Billboard, OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { Camera, Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BasicDocumentType from "../../../../types/BasicDocumentType";
import CoordinateType from "../../../../types/CoordinateType";
import AxisMesh from "./AxisMesh";
import InstancedDocumentMesh from "./InstancedDocumentMesh";
import InstancedWordMesh from "./InstancedWordMesh";

interface DefaultViewerCanvasProps {
    documents : BasicDocumentType[];
    words: BasicDocumentType[];
    scale : number;
    setClickedDocument : React.Dispatch<React.SetStateAction<BasicDocumentType | null>>;
}

const DefaultViewerCanvas = (props : DefaultViewerCanvasProps) => {    
    const [hoveredDocument, setHoveredDocument] = useState<BasicDocumentType | null>(null);
    const [showScale, setShowScale] = useState(false);
    const [showAxis, setShowAxis] = useState(true);
    const camera = useRef<Camera>(new THREE.PerspectiveCamera());
    const controls = useRef<any>();

    /*
    useEffect(() => {
        if (clickedDocument !== null) {
            controls.current.target.set(
                parseFloat(`${clickedDocument.vector3.x}`), 
                parseFloat(`${clickedDocument.vector3.y}`), 
                parseFloat(`${clickedDocument.vector3.z}`)
                );
            
            camera.current.position.set(
                parseFloat(`${clickedDocument.vector3.x}`) + 0.1, 
                parseFloat(`${clickedDocument.vector3.y}`) + 0.1, 
                parseFloat(`${clickedDocument.vector3.z}`) + 0.1
            );
        }
    }, [clickedDocument])
    */

    function resetCamera() {
        camera.current.position.set(props.scale/2.5, props.scale/2.5, props.scale/2.5);
        controls.current.target.set(0,0,0);
    }

    return (
        <div className="min-w-full min-h-screen p-2 flex flex items-stretch">
            <div className="rounded-lg bg-white dark:bg-slate-900 min-w-full min-h-full border-solid border-blue-900 border-2">
                <div style={{position: "absolute", bottom: 20, left: 20, height: 34, zIndex:50}}>
                    <div className="max-h-9 flex-row flex justify-start items-stretch space-x-2s">
                        <div className="max-h-9 rounded-full bg-blue-900" onClick={resetCamera}>
                            <img src="/home.png" alt="home" style={{height: 34, width: 34}}/>
                        </div>
                        <div className="max-h-9 rounded-full bg-blue-900" onClick={() => {setShowAxis(!showAxis)}}>
                            <img src="/home.png" alt="home" style={{height: 34, width: 34}}/>
                        </div>
                        <div className="max-h-9 rounded-full bg-blue-900" onClick={() => {setShowScale(!showScale)}}>
                            <img src="/home.png" alt="home" style={{height: 34, width: 34}}/>
                        </div>
                    </div>
                </div>
                <Canvas style={{width: "100%", height: "100%"}}>
                    <ambientLight intensity={0.5} />
                    <PerspectiveCamera ref={camera} position={[props.scale/2.5, props.scale/2.5, props.scale/2.5]} fov={100} makeDefault/>
                    <OrbitControls ref={controls} enablePan={true} target={[0,0,0]}/>

                    {showAxis && 
                        <AxisMesh showScale={showScale} scale={props.scale}/>
                    }
                    <InstancedDocumentMesh 
                        documents={props.documents} 
                        setHoveredDocument={setHoveredDocument}
                        setClickedDocument={props.setClickedDocument}/>
                    <InstancedWordMesh
                        documents={props.words}
                        setHoveredDocument={setHoveredDocument}/>

                    {hoveredDocument != null && 
                        <Billboard position={[hoveredDocument.vector3.x, hoveredDocument.vector3.y + 0.1, hoveredDocument.vector3.z]}>
                            <Text color="black" fontSize={0.1} outlineWidth={'5%'} outlineColor="white">
                                {hoveredDocument.name}
                            </Text>
                        </Billboard>
                    }
                </Canvas>
            </div>
        </div>
    );
}

export default DefaultViewerCanvas;