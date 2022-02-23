import React from "react";
import { Text } from "@react-three/drei";

interface AxisProps {
    showScale : boolean;
    scale : number
}

const AxisMesh = (props : AxisProps) => {
    const scale = [...Array(props.scale).keys()];
    const offset = Math.floor(props.scale / 2);

    return (
        <>
            <mesh>
                <boxBufferGeometry args={[props.scale, 0.01, 0.01]}/>
                <meshToonMaterial color={"blue"}/>
                {props.showScale && scale.filter(scaleNumber => scaleNumber - offset !== 0).map((scaleNumber) => 
                <Text
                key={"x" + scaleNumber}
                scale={[1, 1, 1]}
                color="black"
                anchorX="center"
                anchorY="middle"
                rotation={[0,0,0]}
                position={[scaleNumber - offset, 0.1, 0]}
                >
                    {scaleNumber - offset}
                </Text>
                )}
            </mesh>
            <mesh>
                <boxBufferGeometry args={[0.01, props.scale, 0.01]}/>
                <meshToonMaterial color={"red"}/>
                {props.showScale && scale.filter(scaleNumber => scaleNumber - offset !== 0).map((scaleNumber) => 
                <Text
                key={"y" + scaleNumber}
                scale={[1, 1, 1]}
                color="black"
                anchorX="center"
                anchorY="middle"
                rotation={[0,0,0]}
                position={[0.1, scaleNumber - offset, 0]}
                >
                    {scaleNumber - offset}
                </Text>
                )}
            </mesh>
            <mesh>
                <boxBufferGeometry args={[0.01, 0.01, props.scale]}/>
                <meshToonMaterial color={"green"}/>
                {props.showScale && scale.filter(scaleNumber => scaleNumber - offset !== 0).map((scaleNumber) => 
                <Text
                key={"z" + scaleNumber}
                scale={[1, 1, 1]}
                color="black"
                anchorX="center"
                anchorY="middle"
                rotation={[0, Math.PI / 2, 0]}
                position={[0, 0.1, scaleNumber - offset]}
                >
                    {scaleNumber - offset}
                </Text>
                )}
            </mesh>
        </>
  )
}

export default AxisMesh