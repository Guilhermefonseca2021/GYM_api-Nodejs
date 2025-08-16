import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories';
import { RegisterUseCase } from '../register';
import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository;
    const registerUseCase = new AuthenticateUseCase(usersRepository);

    return registerUseCase
}