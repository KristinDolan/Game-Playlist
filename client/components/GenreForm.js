import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { createNewGenreServer, fetchGenresFromServer } from "../store/genres";

class GenreForm extends React.Component {
    constructor() {
        super();
        this.state = {
            typedIntoGenreInput: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.getAllGenres();
    }
    handleInputChange(event) {
        const inputElement = event.target;
        this.setState({ typedIntoGenreInput: inputElement.value })
    }
    handleSubmit(subEvent) {
        subEvent.preventDefault();
        const genreName = this.state.typedIntoGenreInput;
        this.props.makeANewGenre(genreName);
        this.setState({ typedIntoGenreInput: "" })
    }

    render () {
        return (
            <div>
                <h3>Add a New Genre</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input onChange={this.handleInputChange} type="text" value={this.state.typedIntoGenreInput} placeholder="yo" />
                    </div>
                    <button type="submit">Add Genre</button>
                </form>
                <div>
                    <h4>Current Genres:</h4>
                    <ul>
                        {this.props.existingGenres.map(eachGenre => {
                            return <li key={eachGenre.id}>{eachGenre.name}</li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

GenreForm.propTypes = {
    makeANewGenre: PropTypes.func.isRequired,
    getAllGenres: PropTypes.func.isRequired,
    existingGenres: PropTypes.array.isRequired
};

const mapStateToProps = (fullReduxState) => {

    return {
        existingGenres: fullReduxState.selectableGenres
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGenres: () => {
            dispatch(fetchGenresFromServer());
        },
        makeANewGenre: (newGenreName) => {
            dispatch(createNewGenreServer(newGenreName));
        } 
    }
}

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default connector(GenreForm);