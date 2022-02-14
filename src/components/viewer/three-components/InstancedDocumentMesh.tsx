import React, { useLayoutEffect, useRef } from "react";
import { Euler, InstancedMesh, Matrix4, Quaternion, Vector3 } from "three";
import BasicDocumentType from "../../../types/BasicDocumentType";

interface InstancedDocumentMeshProps {
    documents : BasicDocumentType[];
}

const InstancedDocumentMesh = (props : InstancedDocumentMeshProps) => {
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

          position.x = props.documents[index].vector3.x;
          position.y = props.documents[index].vector3.y;
          position.z = props.documents[index].vector3.z;

          matrix.compose(position, quaternion, scale);

          meshRef.current!.setMatrixAt(index, matrix);
        }
        meshRef.current!.instanceMatrix.needsUpdate = true;
    }, [])

    return (
      <instancedMesh ref={meshRef} args={[undefined, undefined, props.documents.length]}>
          <sphereBufferGeometry attach="geometry" args={[0.2, 16, 16]}/>
          <meshToonMaterial attach="material" color={"blue"} opacity={0.5} transparent/>
      </instancedMesh>
    );
}

export default InstancedDocumentMesh;