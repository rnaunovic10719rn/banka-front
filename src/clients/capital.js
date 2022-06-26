import {get, post} from "./api";

const BASE_URL = process.env.REACT_APP_ACCOUNTS_API;

export function performPayment(body) {
    let url = new URL(BASE_URL + "/racun/transakcija");
    return post(url, body);
}

export function securityCapitalListing() {
    let url = new URL(BASE_URL + "/racun/kapitalStanje");
    return get(url);
}

export function boughtSecurity(kapType) {
    let url = new URL(BASE_URL + "/racun/kapitalStanje/" + kapType);
    return get(url);
}

export function historyOfOrder(kapType, idSecurity) {
    let url = new URL(BASE_URL + "/racun/transakcijaHartije/" + kapType + "/" + idSecurity);
    return get(url);
}