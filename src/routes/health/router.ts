import express from "express";

const router = express.Router();

router.get("/", (_, res) => res.sendStatus(200));

export default router;
