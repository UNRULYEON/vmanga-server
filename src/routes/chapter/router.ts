import { manganato } from "@sources";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  // const result = await manganato.chapter(req.query.id.toString(), req.query.chapter.toString())
  // return res.send(result)
});

export default router;
