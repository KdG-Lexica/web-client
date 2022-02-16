import { OrbitControls, OrbitControlsProps } from "@react-three/drei";
import { Camera, Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import BasicDocumentType from "../../../types/BasicDocumentType";
import AxisMesh from "./AxisMesh";
import InstancedDocumentMesh from "./InstancedDocumentMesh";

interface ViewerCanvasProps {
    documents : BasicDocumentType[];
}

const ViewerCanvas = (props : ViewerCanvasProps) => {
    const [hoveredDocument, setHoveredDocument] = useState<BasicDocumentType | null>(null);

    return (
        <>
            <Canvas style={{height: "100%", width: "100%"}}>
              <ambientLight intensity={0.5} />
              <OrbitControls enablePan={false}/>

              <AxisMesh showScale={true} scale={30}/>
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

export default ViewerCanvas;