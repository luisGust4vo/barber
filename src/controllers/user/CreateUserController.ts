import { Response, Request } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();
    try {
      const user = await createUserService.execute({ name, email, password });
      return response.json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return response
          .status(500)
          .json({ message: "Erro ao criar usuário", error: error.message });
      } else {
        return response.status(500).json({ message: "Erro desconhecido" });
      }
    }
  }
}

export { CreateUserController };
