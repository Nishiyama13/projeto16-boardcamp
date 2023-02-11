import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

import router from "./routers/index.routers.js"; 
//import gamesRouter from "./routers/games.routers.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);
//server.use([gamesRouter]);

const port = process.env.PORT || 5500 || 6700;
server.listen(port, ()=> {console.log(`Servidor conectado a porta ${port}`)});