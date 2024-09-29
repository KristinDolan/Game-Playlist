import React from "react";
import axios from "axios";

class Game extends React.Component {

    render() {
        const { theGame } = this.props;

        return (
            <li className={theGame.played ? 'played' : ''}>
                <h2>{theGame.title}</h2>


                <ul className='genres-list'>
                    {theGame.genres.map(genre => {
                        return <li key={genre.id}><a>{genre.name}</a></li>
                    })}
                </ul>
                <ul>My Score: {theGame.my_rating}</ul>
            </li>
            )
    }
}

class GameList extends React.Component {

    constructor() {
        super();
        this.state = {
            fetchedGames: []
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get("/games");
            const ourGames = response.data;
            this.setState({ fetchedGames: ourGames });
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    }

    render() {

        if (this.state.fetchedGames.length === 0) {
            return <h3>This will be a loading screen...</h3>
        }

        return (
            <div id="game-list">
                <ul id="list-of-games">
                    {this.state.fetchedGames.map(aGame => {
                        return <Game key={aGame.id} theGame={aGame} />;
                    })}
                </ul>
            </div>
        )
    }
}

export default GameList;
