import React from "react";

import GameList from "./GameList";
import GenreForm from "./GenreForm";

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Games</h1>
                <nav>
                    <a>Unplayed</a><br/>
                    <a>What Should I Play?</a><br/>
                    <a>Add New Game</a>
                </nav>
                {/* <GameList /> */}
                <GenreForm />
            </div>
        )
    }
}

export default App;