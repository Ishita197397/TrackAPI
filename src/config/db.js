import pg from 'pg';
import 'dotenv/config';
const { Pool } = pg;

const pool = new Pool();

pool.on('connect', () => {
    console.log('Database connected successfully!');
});

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
});

export default pool;
