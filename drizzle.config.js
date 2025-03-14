import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
    host: "ep-nameless-hill-a5gy1ixy-pooler.us-east-2.aws.neon.tech",
    user: "neondb_owner",
    password: "npg_Ndw1iQ9BKxTE",
    database: "Expense Tracker",
    ssl: true
  },
});