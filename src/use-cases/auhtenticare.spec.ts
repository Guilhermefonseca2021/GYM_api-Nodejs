import { InMemoryUsersRepository } from "@/repositories/prisma/in-memory/in-memory-repositories";
import { compare, hash } from "bcrypt";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";

describe("Register Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository); // system under test
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
