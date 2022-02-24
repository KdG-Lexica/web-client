import React, { useLayoutEffect, useRef } from "react";
import { InstancedMesh, Euler, Quaternion, Vector3, Matrix4 } from "three";
import BasicDocumentType from "../../../../types/BasicDocumentType";
import { Text } from "@react-three/drei";

interface InstancedTimeframeMeshProps {
    year : number;
    offset : number;
    documents : BasicDocumentType[];
    dimensions: number;
}

const InstancedTimeframeMesh = (props : InstancedTimeframeMeshProps) => {   
    const meshRef = useRef<InstancedMesh>();
    const rotation = new Euler();
    const quaternion = new Quaternion();
    const scale = new Vector3();

    rotation.x = rotation.y = rotation.z = 0;
    quaternion.setFromEuler(rotation);
    scale.x = scale.y = scale.z = 1;

    useLayoutEffect(() => {      
        for (let index = 0; index < props.documents.length; index++) {
          const position = new Vector3();
          const matrix = new Matrix4();

          position.x = props.documents[index].vector3.x / 50 * props.dimensions;
          position.y = props.documents[index].vector3.y / 50 * props.dimensions;
          position.z = 0;

          matrix.compose(position, quaternion, scale);

          meshRef.current!.setMatrixAt(index, matrix);
        }
        meshRef.current!.instanceMatrix.needsUpdate = true;

    }, []);

    return (
        <mesh position={[0, 0, props.offset * 5]} rotation={[0, 1, 0]}>
            <boxBufferGeometry args={[props.dimensions,props.dimensions,0.01]}/>
            <meshToonMaterial attach="material" color={"white"} opacity={0.5} transparent/>
            <Text
                scale={[5, 5, 5]}
                color="black"
                anchorX="center"
                anchorY="middle"
                rotation={[0,0,0]}
                position={[0, -(props.dimensions/2) - 0.5, 0]}
                >
                    {props.year}
                </Text>
            <instancedMesh ref={meshRef} args={[undefined, undefined, props.documents.length]}>
                    <sphereBufferGeometry attach="geometry" args={[0.1, 16, 16]}/>
                    <meshToonMaterial attach="material" color={"blue"} opacity={0.5} transparent/>
            </instancedMesh>
        </mesh>
    );
}

export default InstancedTimeframeMesh;