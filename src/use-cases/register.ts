import { UsersRepository } from "@/repositories/prisma/user-repository";
import { hash } from "node:crypto";
import { UsersAlreadyExistsError } from "./errors";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
// Solid
// D: Dependency Inversion Principle
export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = hash("sha256", password).toString();

    const userWithSameEmail = await this.userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UsersAlreadyExistsError();
    }

    this.userRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
