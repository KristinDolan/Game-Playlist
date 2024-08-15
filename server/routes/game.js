const express = require('express');
const router = express.Router();

module.exports = router;

const { Game, Genre } = require('../db');

// GET /games
router.get("/", async (req, res, next) => {
    try {
        const games = await Game.findAll({
            include: [Genre],
            order: [
                ["my_rating", "DESC"]
            ]
        })
        res.send(`
            <!DOCTYPE html>
            <html>
                <head><title>Game List</title></head>
                <body>
                    <h1>My Games</h1>
                    <ul>
                        ${games.map((game) => {
                            return `
                                <li>
                                    <h2>${game.title}</h2>
                                    <ul>My Score: ${game.my_rating}</ul>
                                    <ul>
                                        ${game.genres.map(genre => {
                                            return `<li>${genre.name}</li>`
                                        }).join("")}
                                    </ul>
                                </li>
                            `
                        }).join("")}
                    </ul>
                </body>
            </html>
        `)
    } catch (e) {
        next(e)
    }
})

// GET /games/add-game
// respond w HTML text to be rendered
// show a form
router.get("/add-game", async (req, res) => {
    const allMyGenres = await Genre.findAll();

    res.send(`
        <!DOCTYPE html>
        <html lang='en'>
            <head>
                <title>Add Game</title>
            </head>
            <body>
                <h1>Add a Game to Your Playlist</h1>
                <form method='POST' action='/games'>
                    <div>
                        <label>Title
                            <input type='text' name='title' />
                        </label>
                    </div>
                    <div>
                        <div id='genre-select-container'>
                            <select id='genre-select' name='genres'>
                                <option></option>
                                ${
                                    allMyGenres.map(genre => {
                                        return `<option value="${genre.id}">${genre.name}</option>`
                                    }).join('')
                                }
                            </select>
                        </div>
                        <button type='button' id='add-genre'>+</button>
                    </div>
                    <div>
                        <label>Played?
                            <input type='checkbox' name='played' />
                        </label>
                    </div>
                    <div>
                        <label>My Rating
                            <input type='number' name='my_rating' />
                        </label>
                    </div>
                    <div>
                        <label>IGN Rating
                            <input type='number' name='ign_rating' />
                        </label>
                    </div>
                    <button type="submit">Add Game</button>
                </form>
            </body>
            <script type='text/javascript' src='/game-form.js'></script>
        </html>
    `)
})

// POST /games
router.post("/", async (req, res, next) => {
    const title = req.body.title;
    const my_rating = req.body.my_rating;
    const ign_rating = req.body.ign_rating;
    const played = req.body.played;
    const attachedGenreIds = req.body.genres;
    try {
        const newGame = await Game.create({ 
            title: title,
            my_rating: my_rating || null,
            ign_rating: ign_rating,
            played: played || false,
        });
        await newGame.setGenres(attachedGenreIds);
        res.redirect('/games');
    } catch (e) {
        next(e);
    }
})
