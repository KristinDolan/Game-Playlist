/*

    {
        games: array of game objects (rows in DB)
        selectableGenres: array of genre objects (rows in DB)
        randomGame ("What Should I Play?"): single game object
        ~ unplayed games: array of game objects ~
    }

    Canonical source of changing info in our app

    Dispatch an action to the store:
        store.dispatch({ type: SET_ALL_GAMES, games: gamesFromServer })

*/

import { configureStore, combineReducers } from "redux";

const storeObj = configureStore(combineReducers({
    games: (state = [], action) => { 

        if (action.type === "SET_GAMES") {
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
}))


window.storeObj = storeObj;

export default storeObj;
