const express = require('express');
const router = express.Router();

module.exports = router;

const { Genre } = require('../db')

// GET /genre
// respond w HTML text to be rendered
// show a form
router.get("/", async (req, res, next) => {
    try {
        const genres = await Genre.findAll({
            order: [["name", "ASC"]]
        })
        res.json(genres);
    } catch (e) {
        next (e)
    }
})

// POST /genre
router.post("/", async (req, res, next) => {
    try {
        const newGenre = await Genre.create({ name: req.body.name });
        res.json(newGenre);
    } catch (e) {
        next(e);
    }
})
