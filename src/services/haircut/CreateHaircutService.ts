import prismaClient from "../../prisma";
import { CreateHaircut } from "../../dtos/haircut.dtos/CreateHaircutService.dto";
class CreateHaircutService {
  async execute({ user_id, name, price }: CreateHaircut) {
    if (!name || !price) {
      throw new Error("Error");
    }

    const myHaircuts = await prismaClient.haircut.count({
      where: {
        user_id: user_id,
      },
    });

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    });
    console.log(user.subscriptions.status);
    if (myHaircuts >= 3 && user?.subscriptions?.status !== "active") {
      throw new Error("Not create haircut");
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
