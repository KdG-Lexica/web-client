import { OrbitControls, OrbitControlsProps, PerspectiveCamera } from "@react-three/drei";
import { Camera, Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BasicDocumentType from "../../../../types/BasicDocumentType";
import CoordinateType from "../../../../types/CoordinateType";
import AxisMesh from "./AxisMesh";
import InstancedDocumentMesh from "./InstancedDocumentMesh";

interface DefaultViewerCanvasProps {
    documents : BasicDocumentType[];
    scale : number;
    setClickedDocument : React.Dispatch<React.SetStateAction<BasicDocumentType | null>>;
}

const DefaultViewerCanvas = (props : DefaultViewerCanvasProps) => {
    const [mouse, setMouse] = useState<CoordinateType>({x: 0, y: 0});
    const [hoveredDocument, setHoveredDocument] = useState<BasicDocumentType | null>(null);
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

    return (
        <div style={{height: "100%", width: "100%"}} onMouseMove={(e) => {setMouse({x: e.clientX, y: e.clientY});}}>
            { hoveredDocument !== null && 
                <p style={{position: "absolute", top: mouse.y, left: mouse.x,
                  textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
                  fontSize:"1rem", paddingLeft: "1rem", userSelect:"none"}}>
                  {hoveredDocument.name}
                </p>
            }
            <Canvas style={{height: "100%", width: "100%"}}>
              <ambientLight intensity={0.5} />
              <PerspectiveCamera ref={camera} position={[props.scale/2.5, props.scale/2.5, props.scale/2.5]} fov={100} makeDefault/>
              <OrbitControls ref={controls} enablePan={true} target={[0,0,0]}/>

              <AxisMesh showScale={false} scale={props.scale}/>
              <InstancedDocumentMesh 
                documents={props.documents} 
                setHoveredDocument={setHoveredDocument}
                setClickedDocument={props.setClickedDocument}/>
            </Canvas>
        </div>
    );
}

export default DefaultViewerCanvas;