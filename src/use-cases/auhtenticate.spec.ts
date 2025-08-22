import { InMemoryUsersRepository } from "@/repositories/prisma/in-memory/in-memory-users-repositories";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    const mail = new Date().getMilliseconds + new Date().getTime().toString();

    await usersRepository.create({
      name: "Jhon Digle",
      email: `jhon${mail}@gmail.com"`,
      password_hash: await hash("12345678", 6),
    });

    const { user } = await sut.execute({
      email: `jhon${mail}@gmail.com"`,
      password: "12345678",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
