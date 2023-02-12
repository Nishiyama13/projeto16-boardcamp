import { Router } from "express";
import gamesRouter from "./games.routers.js";
import customersRouter from "./customers.routers.js"
import rentalsRouter from "./rentals.routers.js"

const router = Router();

router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;