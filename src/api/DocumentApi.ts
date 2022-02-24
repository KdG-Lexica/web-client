import axios from "axios";
import FilterItemType from "../types/FilterItemType";

const api = axios.create({
    baseURL: "https://lexica-api.verhelst.dev"
})

export async function getModel(model : string) {
	const response = await api.get(`/models/${model}`);
	return response.data;
}

export interface GetDocumentsProps {
	model : string;
	limit : number;
	offset : number;
	filter : FilterItemType[];
}

export async function getDocuments(props : GetDocumentsProps) {
	const response = await api.post(`/models/${props.model}/documents?limit=${props.limit}&offset=${props.offset}`, {filter : props.filter} );
	return response.data;
}

export interface GetDocumentProps {
	model : string;
	document : string;
}

export async function getDocument(props : GetDocumentProps) {
	const response = await api.get(`/models/${props.model}/documents/${props.document}`);
	return response.data;
}