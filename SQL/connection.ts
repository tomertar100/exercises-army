import { Client } from "pg";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "redditDB",
  password: "postgres",
  port: 5432,
});
