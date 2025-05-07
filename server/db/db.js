import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER || "admin",
  host: process.env.DB_HOST || "postgres", // Use 'postgres' as the hostname
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
