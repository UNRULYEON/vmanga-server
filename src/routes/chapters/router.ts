import { manganato } from "@sources";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await manganato.chapters(req.query.id.toString());

  return res.send(result);
});

export default router;
