import axios from 'axios';
import { makeGetRequest, makePostRequest } from '../api-instance';

export const getRecordSubmissionCall = (regions, cisco, zap, etab, performance, startDate, endDate, isWeekly, page, limit) => {
    let params = {};
    if (regions) params.regions = regions;
    if (cisco) params.cisco = cisco;
    if (zap) params.zap = zap;
    if (etab) params.etab = etab;
    if (performance) params.performance = performance;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (isWeekly) params.isWeekly = isWeekly;
    if (page) params.page = page;
    if (limit) params.limit = limit;
    return makeGetRequest("api/educ-etablissement/get-record-submission", params, null)
};

export const getAllRegionsCall = (page, limit) => {
    let params = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    return makeGetRequest("api/educ-etablissement/get-all-region", params, null)
};

export const getAllCiscoByRegionIdCall = (region, page, limit) => {
    let params = {};
    if (region) params.region = region;
    if (page) params.page = page;
    if (limit) params.limit = limit;
    return makeGetRequest("api/educ-etablissement/get-all-cisco-by-region-id", params, null)
};

export const getAllZapByCiscoIdCall = (cisco, page, limit) => {
    let params = {};
    if (cisco) params.cisco = cisco;
    if (page) params.page = page;
    if (limit) params.limit = limit;
    return makeGetRequest("api/educ-etablissement/get-all-zap-by-cisco-id", params, null)
};

// export const getGalleryCall = (image, role_id) => {
//     let params = {}
//     if (image) params.image = image;
//     if (role_id) params.role_id = role_id;

//     // let params = "";
//     // for (let index = 0; index < images.length; index++) {
//     //     const element = images[index];
//     //     params += `image[${index}]=${element.gr_photo_photo}&`
//     // }
//     // params += `role_id=${role_id}`;

//     let route = `https://datafetcher-school-system-worldbank.dsmeglobal.com/api/educ-etablissement/gallery`;
//     console.log("route", route)

//     return axios.get(route, {
//         params
//     })
// };

export const getGalleryCall = (images, role_id) => {
    let params = "";
    for (let index = 0; index < images.length; index++) {
        const element = images[index];
        params += `image[${index}]=${element.gr_photo_photo}&`
    }
    params += `role_id=${role_id}`;

    let route = `https://datafetcher-school-system-worldbank.dsmeglobal.com/api/educ-etablissement/gallery?${params}`;
    console.log("route", route)

    return axios.get(route)
};