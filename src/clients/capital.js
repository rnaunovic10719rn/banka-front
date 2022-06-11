import { get, post } from "./api";
const BASE_URL = "http://localhost:8083/api";

export function performPayment(body) {
    let url = new URL(BASE_URL + "/racun/transakcija");
    return post(url, body);
}

export function securityCapitalListing() {
    let url = new URL(BASE_URL + "/racun/sredstva-kapital");
    return get(url);
}

export function boughtSecurity(id) {
    let url = new URL(BASE_URL + "/racun/hartijaOdVrednosti/" + id);
    return get(url);
}

export function historyOfOrder(idSecurity) {
    let url = new URL(BASE_URL + "/racun/historyOfOrder/" + idSecurity);
    return get(url);
}