const Sequelize = require('sequelize');

const dbConnection = new Sequelize(
    "postgres://postgres:Frostine.13@localhost:5432/gamesplaylist"
);

module.exports = dbConnection;

/*
MODELS:

    Games:
    - title (not null)
    - rating
    - played (bool Y/N, default False)

    Genre:
    - name (not null)

    Many-to-Many movies+genres
    belongsToMany

*/

const Game = dbConnection.define('game', {
    title: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    my_rating: {
        type: Sequelize.DataTypes.NUMBER,
        allowNull: true
    },
    ign_rating: {
        type: Sequelize.DataTypes.NUMBER,
        allowNull: true
    },
    ign_review: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
    },
    played: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

const Genre = dbConnection.define("genre", {
    name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
    }
})

Game.belongsToMany(Genre, { through: "game_genres" });
Genre.belongsToMany(Game, { through: "game_genres" });