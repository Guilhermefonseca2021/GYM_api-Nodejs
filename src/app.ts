import fastify from "fastify";
import { ZodError } from "zod";
import { appRoutes } from "./routes";
import { env } from "./config/auth";

export const app = fastify();

app.register(appRoutes);
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "prod") {
    console.error(error);
  } else {
    // in production, we might want to log errors differently datadog, sentry, etc.

  }

  return reply.status(500).send({
    message: "Internal Server Error",
  });
});
