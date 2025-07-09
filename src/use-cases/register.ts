import { prisma } from "@/libs/prisma";
import { hash } from "crypto";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export async function registerUseCase({name, email, password}: RegisterUseCaseRequest) {
    const password_hash = hash("sha256", password).toString();

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  if( userWithSameEmail) {
    throw new Error("❌ User with this email already exists.")
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash, 
    },
  });
}