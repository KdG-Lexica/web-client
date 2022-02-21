import MetaType from "./MetaType";

export default interface ModelType {
    _id: string;
    collectionName: string;
    meta: MetaType[];
}