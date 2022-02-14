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
    baseURL: "https://including-thomas-review-cooked.trycloudflare.com"
})

export async function getDocuments() {
	const response = await api.get("/articles?limit=1000");
	return response.data;
}