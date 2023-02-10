import { Router } from "express";
import { creatNewGame , findAllGames } from "../controllers/GamesControllers.js";
import { validateMiddleware } from "../middlewares/validadeMiddleware.js";
import { gamesSchema } from "../schemas/GamesSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games", findAllGames );
gamesRouter.post("/games", validateMiddleware(gamesSchema), creatNewGame);

export default gamesRouter;

