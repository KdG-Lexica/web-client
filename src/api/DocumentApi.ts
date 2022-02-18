import axios from "axios";

/*
const api = axios.create({
	baseURL: "http://" + window.location.host,
});

export async function getDocuments() {
	const response = await api.get("/data.json");
	return response.data;
}
*/

const api = axios.create({
    baseURL: "https://lexica-api.verhelst.dev"
})

export async function getDocuments() {
	const response = await api.get("/articles?limit=10000");
	return response.data;
}