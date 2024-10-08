const express = require('express');
const router = express.Router();

module.exports = router;

const { Genre } = require('../db')

// GET /genre
// respond w HTML text to be rendered
// show a form
router.get("/", (req, res) => {
    res.send (`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Add a new genre</title>
                <link rel='stylesheet' type='text/css' href='/base-styling.css' />
            </head>
            <body>
                <h1>Add a New Genre</h1>
                <form method="POST" action="/genre">
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" />
                        <button type="submit">Add Genre</button>
                    </div>
                </form>
            </body>
        </html>
    `)
})

// POST /genre
router.post("/", async (req, res, next) => {
    try {
        await Genre.create({ name: req.body.name });
        res.redirect('/genre');
    } catch (e) {
        next(e);
    }
})
