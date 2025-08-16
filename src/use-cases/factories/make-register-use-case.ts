import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories';
import { UsersRepository } from '@/repositories/prisma/user-repository';
import { RegisterUseCase } from '../register';


export function makeRegisterUseCase() {
    const usersRepository = new PrismaUsersRepository;
    const registerUseCase = new RegisterUseCase(usersRepository);

    return registerUseCase
}