import BasicDocumentType from "./BasicDocumentType";

export default interface DatasetType {
    count: number;
    rows: BasicDocumentType[];
    duration: number;
}