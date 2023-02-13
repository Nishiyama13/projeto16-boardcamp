//findAllRentals, createNewRentals, returnRentals, deleteRentals
import { db } from "../config/database.connection.js"
import dayjs from "dayjs"

export async function findAllRentals (req,res) {
    try{
        const rentals = await db.query(`SELECT 
        rentals.id, 
        rentals."customerId", 
        rentals."rentDate",
        rentals."daysRented", 
        rentals."returnDate", 
        rentals."originalPrice", 
        rentals."delayFee", 
        json_build_object('id',customers.id,'name',customers.name) as "customer", json_build_object('id', games.id, 'name', games.name) as "game" 
        FROM rentals 
        JOIN customers ON rentals."customerId" = customers.id 
        JOIN games ON rentals."gameId" = games.id `);
        
        return res.status(200).send(rentals.rows);

    }catch(error){
        return res.status(500).send(error.message);
    }
}  

export async function createNewRentals (req,res){

    const { customerId, gameId, daysRented } = req.body;

    const rentDate = dayjs(Date.now()).format("YYYY-MM-DD");

    try{
        const customer = await db.query('SELECT * FROM customers WHERE id = $1',[customerId]);

        const game = await db.query('SELECT * FROM games WHERE id=$1', [gameId]);

        if(customer.rowCount === 0 || game.rowCount === 0){
            res.status(400).send("Cliente ou jogo não existe")
        }

        const { pricePerDay } = game.rows[0];
        const originalPrice = pricePerDay * daysRented;
        const rentals = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1`,[gameId]);

        const stock = await db.query(`SELECT "stockTotal" FROM games WHERE id = $1`,[gameId]);

        if(stock.rows[0].stockTotal <= rentals.rowCount){
            res.status(400).send('Sem exemplar em estoque');
        }

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`, [customerId, gameId, rentDate, daysRented, null, originalPrice, null]);

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