import { createPool } from "mysql2/promise";

export const pool = createPool({
  database: "developer",
  user: "2tk4m38jupel1cybjub4",
  host: "aws.connect.psdb.cloud",
  password: "pscale_pw_cbVRsciCt4ROZ93Oj2GdBIaGDohadWsYcn27vWfXeeo",
  ssl: {
    rejectUnauthorized: true,
  }
});

