import { USER_DATA } from "../redux-constants";

const INITIAL_STATE = {
    user: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_DATA:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
