import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from "three";
import BasicDocumentType from "../../../../types/BasicDocumentType";
import CosineDocumentType from "../../../../types/CosineDocumentType";

interface InstancedCosineMeshProps {
    pointSize: number;
    documents : CosineDocumentType[];
    setHoveredDocument : React.Dispatch<React.SetStateAction<BasicDocumentType | null>>;
    setClickedDocument : React.Dispatch<React.SetStateAction<BasicDocumentType | null>>;
}

const InstancedCosineMesh = (props : InstancedCosineMeshProps) => { 
    const [hovered, setHovered] = useState<number | undefined>(undefined);
    const [clicked, setClicked] = useState<number | undefined>(undefined);

    const meshRef = useRef<InstancedMesh>();

    useLayoutEffect(() => {      
        const rotation = new Euler();
        const quaternion = new Quaternion();
        const scale = new Vector3();
    
        rotation.x = rotation.y = rotation.z = 0;
        quaternion.setFromEuler(rotation);
        scale.x = scale.y = scale.z = 0.3;
        
        for (let index = 0; index < props.documents.length; index++) {
            const position = new Vector3();
            const matrix = new Matrix4();

            position.x = props.documents[index].doc.vector3.x;
            position.y = props.documents[index].doc.vector3.y;
            position.z = props.documents[index].doc.vector3.z;
            matrix.compose(position, quaternion, scale);

            meshRef.current!.setMatrixAt(index, matrix);
        }
        meshRef.current!.instanceMatrix.needsUpdate = true;        
    }, [props.documents]);

    useEffect(() => {        
        if(clicked !== undefined) {
            props.setClickedDocument(props.documents[clicked].doc);
        }
    }, [clicked]);

    useEffect(() => {
        if(hovered !== undefined) {
            props.setHoveredDocument(props.documents[hovered].doc);
        } else {
            props.setHoveredDocument(null);
        }
    }, [hovered]);

    return (
        <>
            <instancedMesh ref={meshRef} args={[undefined, undefined, props.documents.length]} 
                onPointerMove={(e) => {setHovered(e.instanceId)}}
                onPointerOut={() => {setHovered(undefined)}}
                onClick={(e) => {setClicked(e.instanceId)}}
            >
                <sphereBufferGeometry attach="geometry" args={[0.04 * props.pointSize, 16, 16]}/>
                <meshToonMaterial attach="material" color={"green"} opacity={0.5} transparent/>
            </instancedMesh>
        </> 
    );
}

export default InstancedCosineMesh;