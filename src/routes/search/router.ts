import { manganato } from "@sources";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await manganato.search(req.query.q.toString());

  return res.send(result);
});

export default router;
