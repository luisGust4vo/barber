import { Router } from "express";
import { CreateHaircutController } from "../controllers/haircut/CreateHaircutController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const haircutRoutes = Router();

haircutRoutes.post(
  "/haircut",
  isAuthenticated,
  new CreateHaircutController().handle
);

export { haircutRoutes };
