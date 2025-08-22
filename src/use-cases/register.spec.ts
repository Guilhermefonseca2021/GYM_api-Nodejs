import { InMemoryUsersRepository } from "@/repositories/prisma/in-memory/in-memory-users-repositories";
import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { UsersAlreadyExistsError } from "./errors/user-already-exists-erro";
import { RegisterUseCase } from "./register";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });
  it("should hash password upon registration", async () => {
    // const prismaUsersRepository = new PrismaUsersRepository();
    const mail = new Date();

    const { user } = await sut.execute({
      name: "John Doe",
      email: `jhon${mail}@gmail.com"`,
      password: "12345678",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash!
    );

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to register with same email twice", async () => {
    const email = "JhonDiglle@gmail.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "12345678",
    });

    // resolve / reject
    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(UsersAlreadyExistsError);
  });
});
