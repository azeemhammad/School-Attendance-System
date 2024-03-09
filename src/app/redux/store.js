import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";

import userReducer from "./reducers/user-reducer";
import isWeeklyOrFortnightly from "./reducers/is-weekly-fortnightly-reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: [
        "isWeeklyOrFortnightly",
    ],
};

const rootReducer = combineReducers({
    user: userReducer,
    isWeeklyOrFortnightly: isWeeklyOrFortnightly,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // devTools: process.env.NODE_ENV !== "production",
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(thunkMiddleware),
});

export const persistor = persistStore(store);