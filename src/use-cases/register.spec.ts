import { InMemoryUsersRepository } from "@/repositories/prisma/in-memory/in-memory-repositories";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositories";
import { compare } from "bcrypt";
import { describe, expect, it } from "vitest";
import { UsersAlreadyExistsError } from "./errors/user-already-exists-erro";
import { RegisterUseCase } from "./register";

describe("Register Use Case", () => {
  it("should hash password upon registration", async () => {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    const mail = new Date();

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: `jhon${mail}@gmail.com"`,
      password: "12345678",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash!
    );
    console.log(user);

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to register with same email twice", async () => {
    const userInMemoryRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(userInMemoryRepository);

    const email = "JhonDiglle@gmail.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "12345678",
    });

    // resolve / reject
    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(UsersAlreadyExistsError);
  });
});
