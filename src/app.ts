import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
prisma.$connect()
  .then(() => console.log('Connected to the database'));

prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'jhondigle@gmail.com '
  }
}).then(() => console.log('User created'))
  .catch((error: any) => console.error('Error creating user:', error));

export const app = fastify();
