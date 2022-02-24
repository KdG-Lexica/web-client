import axios from "axios";

const api = axios.create({
    baseURL: "https://lexica-api.verhelst.dev"
})

export async function getModel(model : string) {
	const response = await api.get(`/models/${model}`);
	return response.data;
}

export async function getDocuments(model : string, limit : number, offset: number = 0) {
	const response = await api.post(`/models/${model}/documents?limit=${limit}&offset=${offset}`, {filter : []} );
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