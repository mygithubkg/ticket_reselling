import pg from 'pg';
import env from 'dotenv';

env.config();

const { Pool } = pg;

const db = new Pool({
  connectionString : process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default {
  query: (text, params) => db.query(text, params),
};