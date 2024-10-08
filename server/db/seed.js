const { dbConnection, Game, Genre } = require('./index');

const runSeed = async() => {
    await dbConnection.sync({force: true});

    const rpgGenre = await Genre.create({ name: "RPG" });
    const farmGenre = await Genre.create({ name: "Farming" });
    const aaGenre = await Genre.create({ name: "Action/Adventure" });
    const cozyGenre = await Genre.create({ name: "Cozy" });
    const fpsGenre = await Genre.create({ name: "FPS" });
    const puzzleGenre = await Genre.create({ name: "Puzzle" });
    const mobileGenre = await Genre.create({ name: "Mobile" });
    const fightingGenre = await Genre.create({ name: "Fighting" });
    const coopGenre = await Genre.create({ name: "Co-op" });
    const racingGenre = await Genre.create({ name: "Racing" });
    const horrorGenre = await Genre.create({ name: "Horror" });

    const acnhGame = await Game.create({
        title: "Animal Crossing: New Horizons",
        system: "Switch",
        my_rating: 9,
        played: true
    })
    await acnhGame.setGenres([ cozyGenre, rpgGenre ]);

    const mkwiiGame = await Game.create({
        title: "Mario Kart Wii",
        system: "Wii",
        my_rating: 10,
        played: true
    })
    await mkwiiGame.setGenres([ racingGenre ]);

    const bo3Game = await Game.create({
        title: "Call of Duty: Black Ops III",
        system: "PS4",
        my_rating: 8,
        played: true
    })
    await bo3Game.setGenres([ fpsGenre ]);

    console.log("Seed is complete!");
}
runSeed();