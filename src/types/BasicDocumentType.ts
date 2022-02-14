import PositionType from "./PositionType";

export default interface BasicDocumentType {
    id : string;
    name : string;
    vector: PositionType;
}