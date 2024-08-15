const express = require('express');
const router = express.Router();

module.exports = router;

const { Game, Genre } = require('../db');

// GET /games
router.get("/", (req, res) => {
    res.send("This is my game list!")
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
                        <select name='genres'>
                            <option></option>
                            ${
                                allMyGenres.map(genre => {
                                    return `<option value="${genre.id}">${genre.name}</option>`
                                })
                            }
                        </select>
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
