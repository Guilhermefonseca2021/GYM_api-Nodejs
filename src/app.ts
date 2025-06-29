import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
prisma.$connect()
  .then(() => console.log('Connected to the database'));

prisma.user.create({})

export const app = fastify();
 