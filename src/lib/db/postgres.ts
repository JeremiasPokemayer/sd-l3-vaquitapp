import { Client } from "pg";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: process.env.PASSWORD_POSTGRES,
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch((err) => console.error("Error de conexión", err.stack));

export { client };
