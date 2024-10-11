import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import gamesReducer from "./games";

const storeObj = configureStore({
    reducer: combineReducers({
        games: gamesReducer,
        selectableGenres: (state = []) => {
            return state;
        },
        randomGame: (state = null) => {
            return state;
        }
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default storeObj;
