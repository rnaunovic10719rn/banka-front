import { post } from "./api";
const BASE_URL = "http://localhost:8083/api";

export function performPayment(body) {
    let url = new URL(BASE_URL + "/racun/transakcija");
    return post(url, body);
}