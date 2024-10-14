import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const authUserService = new AuthUserService();
    try {
      const session = await authUserService.execute({ email, password });
      return response.json(session);
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

export { AuthUserController };
