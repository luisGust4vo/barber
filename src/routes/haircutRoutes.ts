import { Router } from "express";
import { CreateHaircutController } from "../controllers/haircut/CreateHaircutController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { ListHaircutController } from "../controllers/haircut/ListHaircutController";
const haircutRoutes = Router();

haircutRoutes.post(
  "/haircut",
  isAuthenticated,
  new CreateHaircutController().handle
);
haircutRoutes.get(
  "/haircuts",
  isAuthenticated,
  new ListHaircutController().handle
);

export { haircutRoutes };
