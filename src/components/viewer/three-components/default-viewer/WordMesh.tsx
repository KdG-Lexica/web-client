import { Billboard, Html, Text } from "@react-three/drei";
import React from "react";
import IPTCType from "../../../../types/IPTCType";

interface WordMeshProps {
    IPTC: IPTCType;
    pointSize: number
}

const WordMesh = (props: WordMeshProps) => {
    const size = 0.03 * props.pointSize;

    return (
        <>
            {props.IPTC.meta.map((word, index) => {
                return (
                    <Billboard key={index} position={[word.vector3.x, word.vector3.y + 0.1, word.vector3.z]}>
                        <Html style={{ pointerEvents: "none", zIndex: 49 }}>
                            <p style={{
                                color: "black", WebkitTextStrokeWidth: "0.5px", WebkitTextStrokeColor: "#FFFFFF",
                                userSelect: "none", whiteSpace: "nowrap", fontSize: "1.2em", textAlign: "center", fontWeight: "bold", zIndex: 49
                            }}>
                                {word.label}
                            </p>
                        </Html>
                    </Billboard>
                );
            })}
        </>
    );
}

export default WordMesh;