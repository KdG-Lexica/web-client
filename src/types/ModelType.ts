import MetaType from "./MetaType";

export default interface ModelType {
    id: string;
    collectionName: string;
    createdAt: Date,
	updatedAt: Date,
    meta: MetaType[];
}