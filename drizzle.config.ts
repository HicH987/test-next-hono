import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv';
config({ path: '.env.local' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.PGHOST!,
    user: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
    database: process.env.PGDATABASE!,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
    ssl: process.env.PGSSL === 'true' ? "require" : false,
  },
})
