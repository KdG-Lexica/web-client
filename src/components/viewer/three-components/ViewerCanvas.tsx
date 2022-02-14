import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import BasicDocumentType from "../../../types/BasicDocumentType";
import InstancedDocumentMesh from "./InstancedDocumentMesh";

interface ViewerCanvasProps {
    documents : BasicDocumentType[];
}

const ViewerCanvas = (props : ViewerCanvasProps) => {
  return (
    <Canvas style={{height: "100%", width: "100%"}}>
        <ambientLight intensity={0.5} />
        
        <OrbitControls/>
        <InstancedDocumentMesh documents={props.documents}/>
    </Canvas>
  );
}

export default ViewerCanvas;