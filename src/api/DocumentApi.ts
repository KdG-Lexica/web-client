import axios from "axios";
import QueryFilterDtoType from "../types/QueryFilterType";

const api = axios.create({
	baseURL: location.hostname === "localhost" ? "http://api.lexica.ovh/api" : "/api",
})

export async function getModel(model: string) {
	const response = await api.get(`/models/${model}`);
	return response.data;
}

export async function getModels() {
	const response = await api.get("/models");
	return response.data;
}

export interface GetDocumentsProps {
	model: string;
	limit: number;
	offset: number;
	filter: QueryFilterDtoType[];
	config?: any;
}

export async function getDocuments(props: GetDocumentsProps) {
	const start = performance.now();
	const response = await api.post(`/models/${props.model}/documents?limit=${props.limit}&offset=${props.offset}&chunkData=yes`, { filter: props.filter }, props.config);
	response.data.duration = Math.floor(performance.now() - start);
	return response.data;
}

export interface GetDocumentProps {
	model: string;
	document: string;
}

export async function getDocument(props: GetDocumentProps) {
	const response = await api.get(`/models/${props.model}/documents?document=${props.document}`);
	return response.data;
}

export async function createModel(body: string) {
	const response = await api.post(`/models`, body);
	return response.data;
}

export async function getCosineDistanceDocuments(model: string, range: number, documentId: string) {
	const response = await api.get(`/models/${model}/documents/cosine?rangeFactor=${range}&document=${documentId}`)
	return response.data;
}

export async function getIPTCs() {
	const response = await api.get(`/iptc`)
	return response.data;
}

export async function getIPTC(IPTCId: number) {
	const response = await api.get(`/iptc/${IPTCId}`)
	return response.data;
}