//findAllRentals, createNewRentals, returnRentals, deleteRentals
import { db } from "../config/database.connection.js"
import dayjs from "dayjs"

export async function findAllRentals (req,res) {
    try{

        let query = `SELECT 
        rentals.id, 
        rentals."customerId",
        rentals."gameId",  
        rentals."rentDate",
        rentals."daysRented", 
        rentals."returnDate", 
        rentals."originalPrice", 
        rentals."delayFee", 
        json_build_object(
            'id',customers.id,
            'name',customers.name
            ) as "customer",
        json_build_object(
            'id', games.id, 
            'name', games.name
        ) as "game" 
        FROM rentals 
        JOIN customers ON rentals."customerId" = customers.id 
        JOIN games ON rentals."gameId" = games.id`;

        const rentals = await db.query(query);
        
        return res.status(200).send(rentals.rows);

    }catch(error){
        return res.status(500).send(error.message);
    }
}  

//faz a busca por id do cliente
/* export async function findAllRentals (req,res) {
    try{
        let customerId = req.params.customerId;

        let query = `SELECT 
        rentals.id, 
        rentals."customerId",
        rentals."gameId",  
        rentals."rentDate",
        rentals."daysRented", 
        rentals."returnDate", 
        rentals."originalPrice", 
        rentals."delayFee", 
        json_build_object(
            'id',customers.id,
            'name',customers.name
            ) as "customer",
        json_build_object(
            'id', games.id, 
            'name', games.name
        ) as "game" 
        FROM rentals 
        JOIN customers ON rentals."customerId" = customers.id 
        JOIN games ON rentals."gameId" = games.id`;

        if(req.query.customerId){
            customerId = req.query.customerId;
            query += ` WHERE rentals."customerId" = $1`;
        }

        const rentals = await db.query(query, [customerId]);
        
        return res.status(200).send(rentals.rows);

    }catch(error){
        return res.status(500).send(error.message);
    }
}   */

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

export async function returnRentals (req,res){
    const { id } = req.params;
    
    try{
        const rental = await db.query("SELECT * FROM rentals WHERE id = $1",[id]);

        if(rental.rowCount === 0){
            return res.status(404).send();
        }

        if(rental.rows[0].returnDate !== null){

            return res.status(400).send()
        }

        const now = dayjs();
        const rentDate = dayjs(rental.rows[0].rentDate);
        const daysRented = rental.rows[0].daysRented;
        const pricePerDay = rental.rows[0].pricePerDay;
        const lateDays = Math.max(now.diff(rentDate, 'day') - daysRented,0);
        const delayFee = lateDays * pricePerDay;

        await db.query("UPDATE rentals SET returnDate = $1, delayFee = $2 WHERE id = $3", [now.toISOString(), delayFee, id]);

        return res.status(200).send("modificado");

    }catch(error){
        return res.status(500).send(error.message);
    }
}

/* export async function deleteRentals (req,res){
    try{

    }catch(error){
        res.status(500).send(error.message);
    }
} */