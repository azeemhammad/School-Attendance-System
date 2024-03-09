import { IS_WEEKLY_OR_FORTNIGHTLY, USER_DATA } from "./redux-constants";

export const userAction = (data) => {
    return {
        type: USER_DATA,
        payload: data,
    };
};

export const setIsWeeklyOrFortnightly = (data) => {
    return {
        type: IS_WEEKLY_OR_FORTNIGHTLY,
        payload: data,
    };
};