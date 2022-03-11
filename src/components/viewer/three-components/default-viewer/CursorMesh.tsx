import React from "react";
import Vector3Type from "../../../../types/Vector3Type";

interface CursorMeshProps {
    vector3 : Vector3Type;
}

const CursorMesh = (props : CursorMeshProps) => {
  return (
    <mesh position={[props.vector3.x, props.vector3.y, props.vector3.z]}>
        <sphereBufferGeometry attach="geometry" args={[0.05, 16, 16]}/>
        <meshToonMaterial attach="material" color={"black"} opacity={1} transparent/>
    </mesh>
  )
}

export default CursorMesh;