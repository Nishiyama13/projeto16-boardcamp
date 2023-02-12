//findAllRentals, createNewRentals, returnRentals, deleteRentals
import { db } from "../config/database.connection.js"
import dayjs from "dayjs"

/* export async function findAllRentals (req,res) {
    try{
        const rentals = await db.query("SELECT * FROM rentals");
        res.send(rentals.rows);

    }catch(error){
        res.status(500).send(error.message);
    }
} */

export async function createNewRentals (req,res){
    if(req.path !== "/rentals"){
        return res.status(404).send("Endpoint não encontrado");
    }
    
    const { customerId, gameId, daysRented } = req.body;

    const rentalDate = dayjs(Date.now()).format("YYYY-MM-DD");

    try{
        const customer = await db.query('SELECT * FROM customers WHERE id = $1',[customerId]);
        const game = await db.query('SELECT * FROM games WHERE id=$1', [gameId]);
        if(customer.rowCount === 0 || game.rowCount === 0){
            res.status(400).send("Cliente ou jogo não existe")
        }

        const { pricePerDay } = game.rows[0];
        const originalPrice = pricePerDay * daysRented;
        const rentals = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`,[gameId]);

        const stock = await db.query(`SELECT "stockTotal" FROM games WHERE id = $1`,[gameId]);

        if(stock.rows[0].stockTotal <= rentals.rowCount){
            res.status(201).send('Sem exemplar em estoque');
        }

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`, [customerId, gameId, rentalDate, daysRented, null, originalPrice, null]);

        res.status(201).send("Aluguél criado");

    }catch(error){
        res.status(500).send(error.message);
    }
}

/* export async function returnRentals (req,res){
    try{

    }catch(error){
        res.status(500).send(error.message);
    }
}

export async function deleteRentals (req,res){
    try{

    }catch(error){
        res.status(500).send(error.message);
    }
} */