import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from "three";
import BasicDocumentType from "../../../../types/BasicDocumentType";

interface InstancedWordMeshProps {
    documents : BasicDocumentType[];
    setHoveredDocument : React.Dispatch<React.SetStateAction<BasicDocumentType | null>>;
}

const InstancedWordMesh = (props : InstancedWordMeshProps) => {
    const [hovered, setHovered] = useState<number | undefined>(undefined);

    const meshRef = useRef<InstancedMesh>();
    const rotation = new Euler();
    const quaternion = new Quaternion();
    const scale = new Vector3();

    rotation.x = rotation.y = rotation.z = 0;
    quaternion.setFromEuler(rotation);
    scale.x = scale.y = scale.z = 0.3;

    useLayoutEffect(() => {      
        for (let index = 0; index < props.documents.length; index++) {
          const position = new Vector3();
          const matrix = new Matrix4();

          position.x = props.documents[index].vector3.x;
          position.y = props.documents[index].vector3.y;
          position.z = props.documents[index].vector3.z;

          matrix.compose(position, quaternion, scale);

          meshRef.current!.setMatrixAt(index, matrix);
        }
        meshRef.current!.instanceMatrix.needsUpdate = true;        
    }, []);

    useEffect(() => {
        if(hovered !== undefined) {
            props.setHoveredDocument(props.documents[hovered]);
        } else {
            props.setHoveredDocument(null);
        }
    }, [hovered]);

    return (
        <>
            <instancedMesh ref={meshRef} args={[undefined, undefined, props.documents.length]} 
                onPointerMove={(e) => {setHovered(e.instanceId)}}
                onPointerOut={() => {setHovered(undefined)}}>
                <sphereBufferGeometry attach="geometry" args={[0.3, 16, 16]}/>
                <meshToonMaterial attach="material" color={"green"} opacity={0.5} transparent/>
            </instancedMesh>
        </> 
    );
}

export default InstancedWordMesh;