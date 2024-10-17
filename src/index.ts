import { Router } from "express";
import { haircutRoutes } from "./routes/haircutRoutes";
import { userRoutes } from "./routes/userRoutes";
const router = Router();
router.use(userRoutes);
router.use(haircutRoutes);
export { router };
