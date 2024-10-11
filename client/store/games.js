

export const SET_GAMES = "SET_GAMES";

//action to set games on store
export const setGamesOnStore = (games) => {
    return { type: SET_GAMES, gamesArray: games }
};

//Thunk action

