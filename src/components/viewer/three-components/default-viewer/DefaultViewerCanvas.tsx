import { OrbitControls, OrbitControlsProps, PerspectiveCamera } from "@react-three/drei";
import { Camera, Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BasicDocumentType from "../../../../types/BasicDocumentType";
import AxisMesh from "./AxisMesh";
import InstancedDocumentMesh from "./InstancedDocumentMesh";

interface DefaultViewerCanvasProps {
    documents : BasicDocumentType[];
}

const DefaultViewerCanvas = (props : DefaultViewerCanvasProps) => {
    const [hoveredDocument, setHoveredDocument] = useState<BasicDocumentType | null>(null);
    const [clickedDocument, setClickedDocument] = useState<BasicDocumentType | null>(null);
    const camera = useRef<Camera>(new THREE.PerspectiveCamera());
    const controls = useRef<any>();
    const scale = 30;

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

    return (
        <>
            <Canvas style={{height: "100%", width: "100%"}}>
              <ambientLight intensity={0.5} />
              <PerspectiveCamera ref={camera} position={[scale/2.5, scale/2.5, scale/2.5]} fov={100} makeDefault/>
              <OrbitControls ref={controls} enablePan={true} target={[0,0,0]}/>

              <AxisMesh showScale={false} scale={scale}/>
              <InstancedDocumentMesh 
                documents={props.documents} 
                setHoveredDocument={setHoveredDocument}
                setClickedDocument={setClickedDocument}/>

            </Canvas>
          {
              hoveredDocument !== null && 
              <div style={{position: "absolute", left: 0, bottom: 0}}>
                  <p style={{fontSize:"2rem", paddingLeft: "1rem"}}>{hoveredDocument.name}</p>
              </div>
          }
        </>

    );
}

export default DefaultViewerCanvas;