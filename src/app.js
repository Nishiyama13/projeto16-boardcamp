import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

import routers from "./routers/index.routers.js"; 

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());
server.use(routers)

const port = process.env.PORT || 5500;
server.listen(port, ()=> {console.log(`Servidor conectado a porta ${port}`)});
