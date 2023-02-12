import { Router } from "express";
import { findAllCustomers, findCustomersById, createNewCustomers, updateCustomers } from "../controllers/CustomersControllers.js";
import { validateMiddleware } from "../middlewares/validadeMiddleware.js";
import { customersSchema } from "../schemas/CustomersSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", findAllCustomers );
customersRouter.get("/customers/:id", findCustomersById );
customersRouter.post("/customers", validateMiddleware(customersSchema), createNewCustomers);
customersRouter.put("/customers/:id", validateMiddleware(customersSchema), updateCustomers);

export default customersRouter;