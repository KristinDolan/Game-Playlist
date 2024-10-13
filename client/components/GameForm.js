import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { fetchGenresFromServer } from "../store/genres";

class GameForm extends React.Component {
    constructor() {
        super();
        this.state = {
            gameTitleTyped: "",
            myRatingTyped: "",
            selectedGenres: [],
            howManyGenres: 1
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleGenreSelection = this.handleGenreSelection.bind(this);
        this.createSelectBoxes = this.createSelectBoxes.bind(this);
        this.addGenreBox = this.addGenreBox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.getGenres();
    }
    handleInputChange(event) {
        const inputElement = event.target;
        this.setState({ typedIntoGenreInput: inputElement.value })
    }
    handleGenreSelection(event) {
        const newGenres = this.state.selectedGenres.slice(0);
        newGenres[position] = newGenre;
        this.setState({selectedGenres: newGenres});
    }
    createSelectBoxes(position, newGenre) {

        const eachSelectElement = [];
        for (let i = 0; i < this.state.howManyGenres; i++) {
            eachSelectElement.push(
                <select key={i} onChange={(event) => {
                    const newGenreForSelect = event.target.value;
                    this.handleGenreSelection(i, newGenreForSelect);
                }}>
                    <option></option>
                    {this.props.genres.map(eachGenre => {
                        return <option key={eachGenre.id} value={eachGenre.id}>{eachGenre.name}</option>
                    })}
                </select>
            )
        }
        return eachSelectElement;
    }
    addGenreBox() {
        this.setState({
            howManyGenres: this.state.howManyGenres + 1
        })
    }
    handleSubmit(submitEvent) {
        submitEvent.preventDefault();

    }
    render() {
        return (
            <div>
                <form>
                    <div>
                        <label>Game Title:</label>
                        <input type="text" name="gameTitleTyped" onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label>My Rating:</label>
                        <input type="text" name="myRatingTyped" onChange={this.handleInputChange} />
                    </div>
                    <div>
                        {this.createSelectBoxes()}
                        <button type="button" onClick={this.addGenreBox}>+</button>
                    </div>
                    <button type="submit">Add Game</button>
                </form>
            </div>
        )
    }
}

GameForm.propTypes = {
    getGenres: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired
};

const mapStateToProps = (fullReduxState) => {

    return {
        genres: fullReduxState.selectableGenres
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenres: () => {
            dispatch(fetchGenresFromServer());
        }
    }
}

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default connector(GameForm);