import fastify from 'fastify';
import z from 'zod';
import { prisma } from './libs/prisma';
const app = fastify();

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { name, email, password } = registerBodySchema.parse(request.body);
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password, // In a real application, hash the password before storing it
    },
  });
  
  return reply.status(201).send();
});


export { app };
