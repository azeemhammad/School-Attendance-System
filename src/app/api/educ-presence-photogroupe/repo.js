import { makeGetRequest, makePostRequest } from '../api-instance';

export const getEtabAttendanceCall = (startDate, endDate, code_etab) => {
    let params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (code_etab) params.code_etab = code_etab;
    return makeGetRequest("api/educ-presence-photogroupe/etab-attendence", params, null)
};

export const getAbsentEtabCall = (startDate, endDate, deviceid) => {
    let params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (deviceid) params.deviceid = deviceid;
    return makeGetRequest("api/educ-presence-photogroupe/absent-etab-record", params, null)
};