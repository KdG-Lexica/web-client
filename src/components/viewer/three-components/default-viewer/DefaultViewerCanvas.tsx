import { OrbitControls, OrbitControlsProps, PerspectiveCamera } from "@react-three/drei";
import { Camera, Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import BasicDocumentType from "../../../../types/BasicDocumentType";
import AxisMesh from "./AxisMesh";
import InstancedDocumentMesh from "./InstancedDocumentMesh";

interface DefaultViewerCanvasProps {
    documents : BasicDocumentType[];
}

const DefaultViewerCanvas = (props : DefaultViewerCanvasProps) => {
    const [hoveredDocument, setHoveredDocument] = useState<BasicDocumentType | null>(null);
    const scale = 30;

    return (
        <>
            <Canvas style={{height: "100%", width: "100%"}}>
              <ambientLight intensity={0.5} />
              <PerspectiveCamera position={[scale/2.5, scale/2.5, scale/2.5]} fov={100} makeDefault/>
              <OrbitControls enablePan={true}/>

              <AxisMesh showScale={true} scale={scale}/>
              <InstancedDocumentMesh documents={props.documents} setHoveredDocument={setHoveredDocument}/>

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