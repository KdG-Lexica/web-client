import PositionType from "./Vector3Type";

export default interface BasicDocumentType {
    id : string;
    name : string;
    date : string;
    vector3 : PositionType;
}