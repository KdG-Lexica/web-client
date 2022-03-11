import BasicDocumentType from "./BasicDocumentType";
import ChunkType from "./ChunkType";

export default interface DatasetType {
    count: number;
    chunks: ChunkType[];
    duration: number;
}