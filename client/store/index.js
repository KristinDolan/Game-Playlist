import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import gamesReducer from "./games";
import genresReducer from "./genres";

const storeObj = configureStore({
    reducer: combineReducers({
        games: gamesReducer,
        selectableGenres: genresReducer,
        randomGame: (state = null) => {
            return state;
        }
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default storeObj;
