import pg from 'pg';
import dotenv from 'dotenv';
//use npm run dev

dotenv.config();

const { Pool } = pg; //abre o túnel de conexão entre o pg e o node

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
}

if(process.env.MODE === 'prod') configDatabase.ssl = true;

export const db = new Pool(configDatabase); //exporta a conexão pela var db