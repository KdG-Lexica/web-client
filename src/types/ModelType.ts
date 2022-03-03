import MetaType from "./MetaType";

export default interface ModelType {
    id: string;
    collectionName: string;
    meta: MetaType[];
    createdAt: Date,
    updatedAt: Date,
}