import dotenv from "dotenv";
import express from "express";
import routes from "@routes";
import { logger } from "@utils";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

routes.map((route) => {
  app.use(`/api${route.path}`, route.router);
});

app.listen(port, () => logger.info(`vmanga-server listening on http://localhost:${port}`));
