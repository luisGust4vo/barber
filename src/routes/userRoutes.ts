import { Router } from "express";
import { CreateUserController } from "../controllers/user/CreateUserController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { UserDetailController } from "../controllers/user/UserDetailController";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userRoutes = Router();

userRoutes.post("/users", new CreateUserController().handle);
userRoutes.post("/session", new AuthUserController().handle);
userRoutes.get("/me", isAuthenticated, new UserDetailController().handle);
userRoutes.put("/users", isAuthenticated, new UpdateUserController().handle);

export { userRoutes };
