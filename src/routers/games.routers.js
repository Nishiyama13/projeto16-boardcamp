import { Router } from "express";
import { createNewGame , findAllGames } from "../controllers/GamesControllers.js";
import { validateMiddleware } from "../middlewares/validadeMiddleware.js";
import { gamesSchema } from "../schemas/GamesSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games", findAllGames );
gamesRouter.post("/games", validateMiddleware(gamesSchema), createNewGame);

export default gamesRouter;

