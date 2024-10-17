import prismaClient from "../../prisma";
import { CreateHaircut } from "../../dtos/haircut.dtos/CreateHaircutService.dto";
class CreateHaircutService {
  async execute({ user_id, name, price }: CreateHaircut) {
    if (!name || !price) {
      throw new Error("Error");
    }
    const haircut = await prismaClient.haircut.create({
      data: {
        name: name,
        price: price,
        user_id: user_id,
      },
    });

    return haircut;
  }
}

export { CreateHaircutService };
