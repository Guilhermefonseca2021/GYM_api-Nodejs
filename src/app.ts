import fastify from "fastify";
import register from "@/controllers/register";
import { appRoutes } from "./routes";
const app = fastify();

app.register(appRoutes)

export { app };
