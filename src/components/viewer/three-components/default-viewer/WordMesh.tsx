import { Billboard, Html } from "@react-three/drei";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { InstancedMesh, Euler, Quaternion, Vector3, Matrix4 } from "three";
import IPTCType from "../../../../types/IPTCType";
import Vector3Type from "../../../../types/Vector3Type";

interface WordMeshProps {
    IPTC: IPTCType;
    pointSize: number
}

/** 
 * Displays a mesh with all the words in an IPTC.
 * 
 * @component
 * @example
 * return(
        <WordMesh pointSize={cameraDistance > 5 ? 5 : cameraDistance < 0.5 ? 0.5 : cameraDistance} IPTC={props.IPTC} />
    )
 * 
*/

const WordMesh = (props: WordMeshProps) => {
    const [data, setData] = useState<Vector3Type[]>([]);
    
    const meshRef = useRef<InstancedMesh>();

    useEffect(() => {
        setData(props.IPTC.meta.flatMap(chunk => chunk.vector3));
    }, [props.IPTC.meta.length])

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

            position.x = data[index].x;
            position.y = data[index].y;
            position.z = data[index].z;
            matrix.compose(position, quaternion, scale);

            meshRef.current!.setMatrixAt(index, matrix);
        }
        meshRef.current!.instanceMatrix.needsUpdate = true;        
    }, [data]);

    return (
        <>
            {props.IPTC.meta.map((word, index) => {
                return (
                    <Billboard key={index} position={[word.vector3.x, word.vector3.y, word.vector3.z]}>
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
            <instancedMesh ref={meshRef} args={[undefined, undefined, data.length]} >
                <sphereBufferGeometry attach="geometry" args={[0.1 * props.pointSize, 16, 16]}/>
                <meshToonMaterial attach="material" color={"green"} opacity={0.5} transparent/>
            </instancedMesh>
        </>
    );
}

export default WordMesh;