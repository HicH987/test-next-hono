// import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { config } from 'dotenv';
config({ path: '.env.local' });

export const db = drizzle({
  connection: {
    host: process.env.PGHOST!,
    user: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
    database: process.env.PGDATABASE!,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
    ssl: true,
  },
})



// const client = new Pool({
//   user: process.env.PGUSER!,
//   database: process.env.PGDATABASE!,
//   host: process.env.PGHOST!,
//   password: process.env.PGPASSWORD!,
//   port: parseInt(process.env.PGPORT || '5432'),
//   ssl: { rejectUnauthorized: process.env.PGSSL === 'true' },
// })

// export const db = drizzle({ client })
