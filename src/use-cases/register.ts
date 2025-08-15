import { UsersRepository } from "@/repositories/prisma/user-repository";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { UsersAlreadyExistsError } from "./errors/user-already-exists-erro";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  password_hash(arg0: string, password_hash: any): unknown;
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UsersAlreadyExistsError();
    }

    const password_hash = await hash(password, 8); // 8 é o "salt rounds"

    const user = await this.userRepository.create({
      name,
      email,
      password_hash, // Certifique-se de que o campo no banco se chama assim
    });

    return {
      user,
    };
  }
}
