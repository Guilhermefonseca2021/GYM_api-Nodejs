import { prisma } from "@/libs/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "./user-repository";

export class PrismaUsersRepository implements UsersRepository {
  constructor() {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error("❌ User with this email already exists.");
    }

    return prisma.user.findUnique({ where: { email } });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
