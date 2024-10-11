import axios from "axios";

const SET_GENRES = "SET_GENRES";

export const fetchGenresFromServer = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/genres");
            const genres = response.data;
            dispatch(setGenresActionCreator(genres))
        } catch (e) {
            console.error(e)
        }
    }
}

export const createNewGenreServer = (newGenreName) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.post("/genre", { name: newGenreName });
            const newGenreByServer = response.data;
            const currentGenres = getState().selectableGenres;
            dispatch(setGenresActionCreator(currentGenres.concat(newGenreByServer)));
        } catch (e) {
            console.error(e)
        }
    }
}

export const setGenresActionCreator = (genres) => {
    return {
        type: SET_GENRES,
        genresToSet: genres
    }
}

export default (state = [], action) => {

    if (action.type === SET_GENRES) {
        return action.genresToSet;
    }

}