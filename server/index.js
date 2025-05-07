import express from "express";
import cors from "cors";
import { Pool } from "pg";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Test PostgreSQL connection
export const pool = new Pool({
  user: process.env.DB_USER || "admin",
  host: process.env.DB_HOST || "localhost", // Use 'postgres' as the hostname
  database: process.env.DB_NAME || "crud_test",
  password: process.env.DB_PASSWORD || "admin",
  port: process.env.DB_PORT || 5433,
});

// Example query
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error executing query", err);
  } else {
    console.log("Connected to PostgreSQL!", res.rows);
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
