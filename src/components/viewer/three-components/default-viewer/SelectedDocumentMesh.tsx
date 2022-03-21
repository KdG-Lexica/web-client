import BasicDocumentType from "../../../../types/BasicDocumentType";

interface SelectedDocumentMeshProps {
    pointSize: number;
    document: BasicDocumentType;
}

/** 
 * Displays a mesh that overlays the currently selected document.
 * 
 * @component
 * @example
 * return(
        <SelectedDocumentMesh document={props.clickedDocument} pointSize={cameraDistance > 3 ? 3 : cameraDistance < 0.5 ? 0.5 : cameraDistance} />
    )
 * 
*/

const SelectedDocumentMesh = (props : SelectedDocumentMeshProps) => {
    return (
        <>
            <mesh position={[props.document.vector3.x, props.document.vector3.y, props.document.vector3.z]}>
                <sphereBufferGeometry attach="geometry" args={[0.02 * props.pointSize, 16, 16]}/>
                <meshToonMaterial attach="material" color={"red"} opacity={0.5} transparent/>
            </mesh>
        </>    
    )
}

export default SelectedDocumentMesh;