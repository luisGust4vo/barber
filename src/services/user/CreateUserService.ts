import { UserServiceRequest } from "../../dtos/user.dtos/CreateUser.dto";
import prismaClient from "../../prisma";
import { userSchema } from "../../schemas/user.schema/user.schemas";
import { hash } from "bcryptjs";

class CreateUserService {
  async execute({ name, email, password }: UserServiceRequest) {
    const { error } = userSchema.validate({ name, email, password });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) {
      throw new Error("Um usuário com este e-mail já existe.");
    }
    const passwordHash = await hash(password, 8);
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}

export { CreateUserService };
