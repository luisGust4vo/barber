import { Request, Response } from "express";
import { ListHaircutService } from "../../services/haircut/ListHaircutService";

class ListHaircutController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id; // verifica se esta logado
    const status = request.query.status as string;
    const listHaircuts = new ListHaircutService();
    const heircut = await listHaircuts.execute({
      user_id,
      status,
    });
    return response.json(heircut);
  }
}

export { ListHaircutController };
