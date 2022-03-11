import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import BasicDocumentType from "../../../../types/BasicDocumentType";
import AxisMesh from "../default-viewer/AxisMesh";
import InstancedDocumentMesh from "../default-viewer/InstancedDocumentMesh";
import InstancedTimeframeMesh from "./InstancedTimeframeMesh";

interface TimeViewerCanvasProps {
    documents : BasicDocumentType[];
}

const TimeViewerCanvas = (props : TimeViewerCanvasProps) => {
    const [ dateDocuments, setDateDocuments ] = useState<[BasicDocumentType[]]>([[]]);
    const [ years, setYears ] = useState<number[]>([]);

    useEffect(() => {
      const localDateDocuments : [BasicDocumentType[]] = [[]];
      const documents = props.documents.map(document => {return {id: document.id, name: document.name, date: new Date(), vector3: document.vector3}})
      const allYears = documents.map(document => document.date.getFullYear());
      const distinctYears = Array.from(new Set(allYears)).sort();      
      distinctYears.forEach(year => {        
        const yearDocuments = documents.filter(document => document.date.getFullYear() === year);        
        localDateDocuments.push(yearDocuments);
      });
      localDateDocuments.shift();      
      setDateDocuments(localDateDocuments);
      setYears(distinctYears);
    }, [])

  return (
    <Canvas style={{height: "100%", width: "100%"}}>
        <ambientLight intensity={0.5} />
        <OrbitControls enablePan={true}/>
        {
          years.map((year, index) => 
            <InstancedTimeframeMesh key={year} year={year} offset={index} documents={dateDocuments.filter(
              documentList => 1 === 1).flat()} dimensions={5}/>
          )
        }
    </Canvas>
  );
}

export default TimeViewerCanvas;