import MetaType from "./MetaType";
import Vector3Type from "./Vector3Type";

export default interface ModelType {
    id: string;
    collectionName: string;
    meta: MetaType[];
    createdAt: Date;
    updatedAt: Date;
    documentCount: number;
    center: Vector3Type;
}