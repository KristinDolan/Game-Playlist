const express = require('express');
const router = express.Router();

module.exports = router;

const { Game, Genre } = require('../db');

// GET /games
// router.get("/", async (req, res, next) => {
//     const onlyPlayed = req.query.isplayed === '1';
//     const whereClause = {};
//     const genreName = req.query.genre;

//     if (onlyPlayed === true) {
//         whereClause.played = false;
//     }

//     try {
//         let games;
//         if (genreName) {
//             const specificGenre = await Genre.findOne({
//                 where: {
//                     name: genreName
//                 }
//             });
//             if (!specificGenre) {
//                 res.status(404).send('Unknown Genre');
//                 return;
//             }
//             games = await specificGenre.getGames({
//                 include: [Genre],
//                 order: [
//                     ["my_rating", "DESC"]
//                 ],
//                 where: whereClause
//             })
//         } else {
//             games = await Game.findAll({
//                 include: [Genre],
//                 order: [
//                     ["my_rating", "DESC"]
//                 ],
//                 where: whereClause
//             })
//         }

        
//         res.send(`
//             <!DOCTYPE html>
//             <html>
//                 <head><title>Game List</title></head>
//                 <link rel='stylesheet' type='text/css' href='/base-styling.css' />
//                 <link rel='stylesheet' type='text/css' href='/game-list-style.css' />
//                 <body>
//                     <h1>My Games List</h1>
//                     <nav>
//                         <a href='/games'>All</a> </br>
//                         <a href='/games/what-play'>What Should I Play?</a> </br>
//                         <a href='/games/what-play/new'>Find A New Game</a> </br>
//                         <a href='/games?isplayed=1'>Want to Play</a> </br>
//                         <a href='/games/add-game'>Add Game</a> </br>
//                     </nav>
//                     <ul id='list-of-games'>
//                         ${games.map((game) => {
//                             return `
//                                 <li class="${game.played === true ? 'played' : ''}">
//                                     <h2>${game.title}</h2>
//                                     <ul class='genres-list'>
//                                         ${game.genres.map(genre => {
//                                             return `<li><a href='/games?genre=${genre.name}'>${genre.name}</a></li>`
//                                         }).join("")}
//                                     </ul>
//                                     <ul>My Score: ${game.my_rating}</ul>
//                                     ${game.played === false ? `<a href='/games/${game.id}/mark-played'>Mark as Played</a>` : ''}
//                                 </li>
//                             `
//                         }).join("")}
//                     </ul>
//                 </body>
//             </html>
//         `)
//     } catch (e) {
//         next(e)
//     }
// })

// GET /games
router.get("/", async (req, res, next) => {

    try {
        const games = await Game.findAll({
            include: [Genre],
            order: [
                ["my_rating", "ASC"]
            ]
        });
        res.json(games);
    } catch (e) {
        next(e);
    }
});

// GET /games/what-play/new
router.get('/what-play/new', async (req, res, next) => {

    try {
        const allUnplayedGames = await Game.findAll({
            where: {
                played: false
            }
        });
        const amountOfUnplayed = allUnplayedGames.length;
        const randomNum = Math.floor(Math.random() * amountOfUnplayed);
        const winner = allUnplayedGames[randomNum];
        res.send (`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Play Me Now!</title>
                    <link rel='stylesheet' type='text/css' href='/base-styling.css' /></head>
                <body>
                    <h1>You should play ${winner.title}!</h1>
                    <a href='/games'>Take Me Home</a>
                    <a href='/games/what-play/new'>Try Again</a>
                </body>
            </html>    
        `)
    } catch (e) {
        next(e)
    }

})

// GET /games/what-play
router.get('/what-play', async (req, res, next) => {



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
                <link rel='stylesheet' type='text/css' href='/base-styling.css' />
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
                            <input type='text' name='my_rating' />
                        </label>
                    </div>
                    <div>
                        <label>IGN Rating
                            <input type='text' name='ign_rating' />
                        </label>
                    </div>
                    <button type="submit">Add Game</button>
                </form>
            </body>
            <script type='text/javascript' src='/game-form.js'></script>
        </html>
    `)
})

router.get('/:gameId/mark-played', async (req, res, next) => {
    const id = req.params.gameId;
    try {
        const theGame = await Game.findByPk(id);
        if (!theGame) {
            res.status(404).send('No movie with that id');
            return;
        }
        theGame.played = true;
        await theGame.save();

        res.redirect('/games')
    } catch (e) {
        next(e)
    }
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
