import pg from 'pg';
import env from 'dotenv';

env.config();

const { Pool } = pg;

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === 'production') {
  dbConfig.ssl = {
    rejectUnauthorized: false
  };
}

const db = new Pool(dbConfig);

db.on('connect', () => {
  console.log('Connected to the database');
});

db.on('error', (err) => {
  console.error('Error connecting to the database:', err);
});

export default {
  query: (text, params) => db.query(text, params),
};