import pool from './config/db.js';

async function testDatabaseConnection() {
    try {
        const result = await pool.query('SELECT NOW()');

        console.log('Database connected successfully!');
        console.log('Current database time:', result.rows[0].now);

    } catch (err) {
        console.error('Database connection error:', err);
    } finally {
        await pool.end();
    }
}

testDatabaseConnection();