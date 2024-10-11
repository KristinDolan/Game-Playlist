import React from "react";
import axios from "axios";

import { connect } from "react-redux";

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

    render() {

        if (this.props.gamesFromState.length === 0) {
            return <h3>This will be a loading screen...</h3>
        }

        return (
            <div id="game-list">
                <ul id="list-of-games">
                    {this.props.gamesFromState.map(aGame => {
                        return <Game key={aGame.id} theGame={aGame} />;
                    })}
                </ul>
            </div>
        )
    }
}
const connector = connect(
    //Map store to props
    (fullReduxState) => {
        return {
            gamesFromState: fullReduxState.games
        }
    },
    //Map dispatch to props
    (dispatchToStore) => {
        return {
            fetchGames: async () => {
                await 
            }
        }
    }
)



export default connector(GameList);
