const express = require("express");
const app = express();
const genresRouter = require('./routes/genre');
const gamesRouter = require('./routes/game')

const PORT = 8080;

const { dbConnection } = require('./db')

const startServer = async() => {
    await dbConnection.sync();

    app.listen(PORT, () => {
        console.log(`~ Server is running on port ${PORT} ~`);
    })
}
startServer();


// start of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/genre', genresRouter);
app.use('/games', gamesRouter);

app.get("/", (req, res) => {
    res.send("Hello :)");
})