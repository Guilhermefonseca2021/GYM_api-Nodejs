import { describe, it, expect } from "vitest";
import { RegisterUseCase } from "./register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositories";

describe("Register Use Case", () => {
  it("should hash password upon registration", async () => {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "JhonDiglle@gmail.com",
      password: "12345678",
    });

    console.log(user);
  });

  it("should pass basic test", () => {
    expect(2 + 2).toBe(4);
  });
});
