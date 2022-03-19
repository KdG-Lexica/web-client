import { Billboard, Text } from "@react-three/drei";
import React from "react";
import IPTCType from "../../../../types/IPTCType";

interface WordMeshProps {
    IPTC : IPTCType;
    pointSize : number
}

const WordMesh = (props : WordMeshProps) => {
    return (
        <>
            {props.IPTC.meta.map((word, index) => {
                return (
                    <Billboard key={index} position={[word.vector3.x, word.vector3.y + 0.1, word.vector3.z]}>
                        <Text color="black" fontSize={0.03 * props.pointSize} outlineWidth={'5%'} outlineColor="white">
                            {word.label}
                        </Text>
                    </Billboard>
                );
            })}
        </> 
    );
}

export default WordMesh;