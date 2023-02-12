import { Router } from "express";
import gamesRouter from "./games.routers.js";
import customersRouter from "./customers.routers.js"

const router = Router();

router.use(gamesRouter);
router.use(customersRouter);

export default router;