import { db } from "../config/database.connection.js"

export async function findAllCustomers (req,res) {
    try{
        const customers = await db.query("SELECT * FROM customers");
        res.send(customers.rows);

    }catch(error){
        res.status(500).send(error.message);
    }
}

export async function findCustomersById (req,res){
    try{

    }catch(error){
        res.status(500).send(error.message);
    }
}

export async function createNewCustomers (req,res) {
    //const { name, image, stockTotal, pricePerDay } = req.body;
    
/*     if(!name || !image || !stockTotal || !pricePerDay){
        return res.status(400);
    } */

    try{
        
/*         const checkExistingGame = await db.query(
            `SELECT * FROM customers WHERE name = $1`, [name]
        );
        
        if(checkExistingGame.rows.length > 0){
            return res.status(409).send("Jogo já cadastrado")
        };

        const customers = await db.query(`INSERT INTO customers (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4) RETURNING *`, [name, image, stockTotal, pricePerDay]);

        console.log(customers.rows[0]);

        res.status(201).send({ message: "Jogo Salvo."});
 */

    }catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function updateCustomers (req,res){
    try{

    }catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

