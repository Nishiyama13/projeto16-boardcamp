import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

const port = process.env.PORT || 5500;
server.listen(port, ()=> {console.log(`Servidor conectado a porta ${port}`)});
