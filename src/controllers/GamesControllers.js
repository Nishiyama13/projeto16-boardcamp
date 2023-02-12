import { db } from "../config/database.connection.js"

export async function findAllGames (req,res) {
    try{
        const games = await db.query("SELECT * FROM games");
        res.send(games.rows);

    }catch(error){
        res.status(500).send(error.message);
    }
}

export async function createNewGame (req,res) {
    const { name, image, stockTotal, pricePerDay } = req.body;
    
    if(!name || !image || !stockTotal || !pricePerDay){
        return res.status(400);
    }

    try{
        
        const checkExistingGame = await db.query(
            `SELECT * FROM games WHERE name = $1`, [name]
        );
        
        if(checkExistingGame.rows.length > 0){
            return res.status(409).send("Jogo já cadastrado")
        };

        const games = await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4) RETURNING *`, [name, image, stockTotal, pricePerDay]);

        console.log(games.rows[0]);

        res.status(201).send({ message: "Jogo Salvo."});

    }catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}


