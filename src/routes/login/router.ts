import { validate_schema } from "@middlware";
import express from "express";
import { auth } from "firebase-admin";
import { DTO_LOGIN, SCHEMA_LOGIN } from "./dto";

const router = express.Router();

router.post("/", validate_schema(SCHEMA_LOGIN), (req, res) => {
  const user = req.body as DTO_LOGIN;

  auth()
    .verifyIdToken(user.id_token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log(uid);
    })
    .catch((error) => {
      console.log(error);
    });

  res.sendStatus(200);
});

export default router;
