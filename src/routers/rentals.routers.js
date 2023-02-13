import { Router } from "express";
//import { findAllRentals, createNewRentals, returnRentals, deleteRentals } from "../controllers/CustomersControllers.js";
import { findAllRentals, createNewRentals, returnRentals } from "../controllers/RentalsControllers.js";
import { validateMiddleware } from "../middlewares/validadeMiddleware.js";
import { rentalsSchema } from "../schemas/RentalsSchema.js"

const rentalsRouter = Router();

rentalsRouter.get("/rentals", findAllRentals );
rentalsRouter.post("/rentals", validateMiddleware(rentalsSchema), createNewRentals);
rentalsRouter.post("/rentals/:id/return", returnRentals);
//rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
