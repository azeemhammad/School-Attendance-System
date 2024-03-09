import axios from "axios"

export const makeGetRequest = (apiPath, params, headers = {}) => {
    let route = process.env.BASE_URL.concat(apiPath);
    console.log("route", route + JSON.stringify(params))

    return axios.get(route, {
        params,
        headers: headers
    })
}

export const makePostRequest = (apiPath, object, headers = {}) => {
    let route = process.env.BASE_URL.concat(apiPath);
    console.log("route", route)

    return axios.post(route, object, {
        headers: headers
    })
}