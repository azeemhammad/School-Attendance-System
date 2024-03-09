import { IS_WEEKLY_OR_FORTNIGHTLY } from "../redux-constants";

const INITIAL_STATE = {
    isWeeklyOrFortnightly: 1,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IS_WEEKLY_OR_FORTNIGHTLY:
            return { ...state, isWeeklyOrFortnightly: action.payload };
        default:
            return state;
    }
};
