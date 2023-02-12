import { db } from "../config/database.connection.js";
//import { customersSchema } from "../schemas/CustomersSchema.js";

export async function findAllCustomers (req,res) {
    try{
        const customers = await db.query("SELECT * FROM customers");
        res.send(customers.rows);

    }catch(error){
        res.status(500).send(error.message);
    }
}

export async function findCustomersById (req,res){
    const { id } = req.params

    try{
        const customers = await db.query("SELECT * FROM customers WHERE id = $1",[id]);
        if(customers.rowCount){
            res.send(customers.rows[0]);      
        }else{
            res.status(404).send("Cliente não encontrado")
        }
    }catch(error){
        res.status(500).send(error.message);
    }
}

export async function createNewCustomers (req,res) {
    const { name, phone, cpf, birthday } = req.body;

    try{

        const checkExistingCpf = await db.query('SELECT * FROM customers WHERE cpf = $1', [cpf]);
        if(checkExistingCpf.rowCount > 0){
            res.status(409).send("Já existe um cliente com este CPF cadastrado.");
            return;
        }
        
        await db.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)", [name, phone, cpf, birthday]);

        res.status(201).send("Novo Cliente cadastrado com sucesso!");

    }catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function updateCustomers (req,res){
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params

    try{
       const checkExistingCustomer = await db.query("SELECT * FROM customers WHERE id = $1", [id]);

       if(checkExistingCustomer){       
        const customerCpf = checkExistingCustomer.rows[0].cpf;
       
        if(cpf !== customerCpf){
            const cpfExists = await db.query("SELECT * FROM customers WHERE cpf = $1",[cpf]); 
            if(cpfExists.rowCount > 0){
                res.status(409).send("CPF cadastrado com outro Usuário");
                return;
            }
        }
        await db.query(
            "UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5 RETURNING*",[name, phone, cpf, birthday, id]
            );
            res.status(200).send("Os dados foram atualizados");
        
       }else{
        res.status(404).send("Cliente não encontrado");
        return;
            }



    }catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

