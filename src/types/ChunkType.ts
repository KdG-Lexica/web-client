import BasicDocumentType from "./BasicDocumentType";
import Vector3Type from "./Vector3Type";

export default interface ChunkType {
    count: number;
    vector: Vector3Type;
    rows: BasicDocumentType[];
}