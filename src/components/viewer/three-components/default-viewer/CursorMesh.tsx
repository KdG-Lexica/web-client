import React, { useEffect, useRef } from "react";
import Vector3Type from "../../../../types/Vector3Type";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

interface CursorMeshProps {
  enableMovement: boolean;
  pointSize: number;
  vector3 : Vector3Type;
}

const CursorMesh = (props : CursorMeshProps) => {  
  const [x, setX] = useState<number>(props.vector3.x);
  const [y, setY] = useState<number>(props.vector3.y);
  const [z, setZ] = useState<number>(props.vector3.z);

  const EnableMovement = () => {
    useFrame(() => {
      setX(props.vector3.x);
      setY(props.vector3.y);
      setZ(props.vector3.z);    
    })

    return (<></>)
  }


  return (
    <>
      <mesh position={[x, y, z]}>
        <sphereBufferGeometry attach="geometry" args={[0.05 * props.pointSize, 4, 0]}/>
        <meshLambertMaterial attach="material" color={"yellow"} wireframe/>
      </mesh>
      {props.enableMovement && <EnableMovement/>}
    </>
  )
}

export default CursorMesh;