import { UpdateUser } from "../../dtos/UpdateUser.dto";
import prismaClient from "../../prisma";

class UpdateUserService {
  async execute({ user_id, name, endereco }: UpdateUser) {
    try {
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error(" Erro ao atualizar o usuario ");
      }
      const userUpdate = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          endereco,
        },
        select: {
          name: true,
          email: true,
          endereco: true,
        },
      });
      return userUpdate;
    } catch (error) {
      throw new Error(" Erro ao atualizar o usuario ");
    }
  }
}

export { UpdateUserService };
