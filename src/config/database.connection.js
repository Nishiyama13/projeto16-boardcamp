import pg from 'pg';
import dotenv from 'dotenv';
//use npm run dev

const { Pool } = pg;

const configDatabase = {
    connectionString: process.env.DADATABASE_URL
}

if(process.env.MODE === 'prod') configDatabase.ssl = true;

export const db = new Pool(configDatabase);