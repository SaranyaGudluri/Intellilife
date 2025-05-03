import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv"; 
dotenv.config(); 
export default  defineConfig({
    schema: "./utils/schema.jsx",
    out: "./drizzle",
    dialect: "postgresql",
    driver: "pglite",
    url : process.env.DATABASE_URL,
});