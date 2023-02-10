import { Router } from "express";
import gamesRouter from "./games.routers.js";

const router = Router();

router.use(gamesRouter);

export default router;