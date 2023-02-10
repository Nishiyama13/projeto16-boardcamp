import { Router } from "express";
import { creatNewGame , findAllGames } from "../controllers/GamesControllers.js"
import { validateMiddleware } from "../middlewares/validadeMiddleware.js"
import { gamesSchema } from "../schemas/GamesSchema.js";

const router = Router();

router.post("/games", validateMiddleware(gamesSchema), creatNewGame);
router.get("/games", findAllGames );

export default router;