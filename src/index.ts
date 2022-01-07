import dotenv from "dotenv";
import express from "express";
import { initializeApp } from "firebase-admin/app";
import routes from "@routes";
import { logger } from "@utils";
import { error_middleware } from "@middlware";

dotenv.config();

initializeApp();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

routes.map((route) => {
  app.use(`/api${route.path}`, route.router);
});

app.use(error_middleware);

app.listen(port, () => logger.info(`vmanga-server listening on http://localhost:${port}`));
