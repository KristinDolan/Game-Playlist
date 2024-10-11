import axios from "axios";

export const SET_GAMES = "SET_GAMES";

//action to set games on store
export const setGamesOnStore = (games) => {
    return { type: SET_GAMES, gamesArray: games }
};

//Thunk action

export const fetchGamesFromServer = () => {
   
    return async (dispatch) => {
        // I get dispatched
        const response = await axios.get("./games");
        const games = response.data;
        dispatch(setGamesOnStore(games));
    }
}

export default (state = [], action) => {
    if (action.type === SET_GAMES) {
        return action.gamesArray;
    }
    return state;
}
