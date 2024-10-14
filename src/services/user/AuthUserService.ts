import prismaClient from "../../prisma";
import { AuthUserRequest } from "../../dtos/AuthUser.dto";
import { userSchema } from "../../schemas/authUser.schemas";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    const { error } = userSchema.validate({ email, password });
    if (error) {
      throw new Error(error.details[0].message);
    }
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
      include: {
        subscriptions: true,
      },
    });
    if (!user) {
      throw new Error("Credenciais inválidas.");
    }
    const passwordMatch = await compare(password, user?.password);
    if (!passwordMatch) {
      throw new Error("Credenciais inválidas.");
    }
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      token: token,
      subscriptions: user.subscriptions
        ? {
            id: user?.subscriptions?.id,
            status: user?.subscriptions?.status,
          }
        : null,
    };
  }
}
export { AuthUserService };
