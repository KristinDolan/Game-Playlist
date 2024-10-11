import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { SET_GAMES } from "./games";

const rootReducer = combineReducers({
    games: (state = [], action) => { 

        if (action.type === SET_GAMES) {
            return action.gamesArray;
        }

        return state;
    },
    selectableGenres: (state = []) => {
        return state;
    },
    randomGame: (state = null) => {
        return state;
    }
});

const storeObj = configureStore({
    reducer: rootReducer
});

window.storeObj = storeObj;

export default storeObj;
