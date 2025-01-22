import pg from 'pg';
import env from 'dotenv';

env.config();

const { Pool } = pg;

const db = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
});

export default {
  query: (text, params) => db.query(text, params),
};