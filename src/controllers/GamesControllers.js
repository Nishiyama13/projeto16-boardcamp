import { db } from "../config/database.connection.js"

export async function findAllGames (req,res) {
    try{
        const games = await db.query("SELECT * FROM games ORDER BY name DESC");
        res.send(games.rows[0]);

    }catch(error){
        res.status(500).send(error.message);
    }
}

export async function creatNewGame (req,res) {
    try{
        const {name, image, stockTotal, pricePerDay } = req.body;
        const games = await db.query(`INSERT INTO games(name, image, stockTotal, pricePerDay) VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);
        console.log(games.row[0]);

        res.status(201).send({ message: "Jogo Salvo."});


    }catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}


