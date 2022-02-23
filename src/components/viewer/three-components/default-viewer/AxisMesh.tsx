import React from "react";
import { Billboard, Text } from "@react-three/drei";

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
                <Billboard key={"x" + scaleNumber} position={[scaleNumber - offset, 0.1, 0]}>
                    <Text 
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    scale={[1, 1, 1]} 
                    outlineWidth={'5%'} 
                    outlineColor="white">
                        {scaleNumber - offset}
                    </Text>
                </Billboard>
                )}
            </mesh>
            <mesh>
                <boxBufferGeometry args={[0.01, props.scale, 0.01]}/>
                <meshToonMaterial color={"red"}/>
                {props.showScale && scale.filter(scaleNumber => scaleNumber - offset !== 0).map((scaleNumber) => 
                <Billboard key={"y" + scaleNumber} position={[0.1, scaleNumber - offset, 0]}>
                    <Text 
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    scale={[1, 1, 1]} 
                    outlineWidth={'5%'} 
                    outlineColor="white">
                        {scaleNumber - offset}
                    </Text>
                </Billboard>
                )}
            </mesh>
            <mesh>
                <boxBufferGeometry args={[0.01, 0.01, props.scale]}/>
                <meshToonMaterial color={"green"}/>
                {props.showScale && scale.filter(scaleNumber => scaleNumber - offset !== 0).map((scaleNumber) => 
                <Billboard key={"z" + scaleNumber} position={[0, 0.1, scaleNumber - offset]}>
                    <Text 
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    scale={[1, 1, 1]} 
                    outlineWidth={'5%'} 
                    outlineColor="white">
                        {scaleNumber - offset}
                    </Text>
                </Billboard>
                )}
            </mesh>
        </>
  )
}

export default AxisMesh