import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from "three";
import BasicDocumentType from "../../../../types/BasicDocumentType";
import ChunkType from "../../../../types/ChunkType";

interface InstancedDocumentMeshProps {
    pointSize: number;
    size: number;
    documents : ChunkType[];
    setHoveredDocument : React.Dispatch<React.SetStateAction<BasicDocumentType | null>>;
    setClickedDocument : React.Dispatch<React.SetStateAction<BasicDocumentType | null>>;
}

/** 
 * Displays a mesh containing a percentage of the total amount of documents.
 * 
 * @component
 * @example
 * return(
    <InstancedDocumentMesh
        pointSize={cameraDistance > 3 ? 3 : cameraDistance < 0.5 ? 0.5 : cameraDistance}
        size={props.size}
        documents={props.documents}
        setHoveredDocument={props.setHoveredDocument}
        setClickedDocument={props.setClickedDocument} />
    )
 * 
*/

const InstancedDocumentMesh = (props : InstancedDocumentMeshProps) => {
    const [hovered, setHovered] = useState<number | undefined>(undefined);
    const [clicked, setClicked] = useState<number | undefined>(undefined);
    const [data, setData] = useState<BasicDocumentType[]>([]);
    
    const meshRef = useRef<InstancedMesh>();

    useEffect(() => {
        setData(props.documents.flatMap(chunk => chunk.rows.slice(0, chunk.count * props.size)));
    }, [props.size])

    useLayoutEffect(() => {      
        const rotation = new Euler();
        const quaternion = new Quaternion();
        const scale = new Vector3();

        rotation.x = rotation.y = rotation.z = 0;
        quaternion.setFromEuler(rotation);
        scale.x = scale.y = scale.z = 0.3;
        
        for (let index = 0; index < data.length; index++) {
            const position = new Vector3();
            const matrix = new Matrix4();

            position.x = data[index].vector3.x;
            position.y = data[index].vector3.y;
            position.z = data[index].vector3.z;
            matrix.compose(position, quaternion, scale);

            meshRef.current!.setMatrixAt(index, matrix);
        }
        meshRef.current!.instanceMatrix.needsUpdate = true;        
    }, [data]);

    useEffect(() => {
        if(clicked !== undefined) {
            props.setClickedDocument(data[clicked]);
        }
    }, [clicked]);

    useEffect(() => {
        if(hovered !== undefined) {
            props.setHoveredDocument(data[hovered]);
        } else {
            props.setHoveredDocument(null);
        }
    }, [hovered]);

    return (
        <>
            <instancedMesh ref={meshRef} args={[undefined, undefined, data.length]} 
                onPointerMove={(e) => {setHovered(e.instanceId)}}
                onPointerOut={() => {setHovered(undefined)}}
                onClick={(e) => {setClicked(e.instanceId)}}
            >
                <sphereBufferGeometry attach="geometry" args={[0.03 * props.pointSize, 16, 16]}/>
                <meshToonMaterial attach="material" color={"blue"} opacity={0.5} transparent/>
            </instancedMesh>
        </> 
    );
}

export default InstancedDocumentMesh;