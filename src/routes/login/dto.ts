import { Asserts, object, string } from "yup";

export const SCHEMA_LOGIN = object()
  .shape({
    id_token: string().defined(),
  })
  .strict();

export type DTO_LOGIN = Asserts<typeof SCHEMA_LOGIN>;
