import { makeGetRequest, makePostRequest } from '../api-instance';

export const getAllUsersCall = (page, limit) => {
    let params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    return makeGetRequest("api/user/get-all", params, null);
};

export const addEmployeeCall = (data) => {
    return makePostRequest("api/user/add-employee", data, null);
};

export const employeeLoginCall = (data) => {
    return makePostRequest("api/user/login", data, null);
};

export const employeeDeleteCall = (data) => {
    return makePostRequest("api/user/delete", data, null);
};