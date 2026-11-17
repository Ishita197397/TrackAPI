// Is file ka kaam hoga database se users ka data fetch karna.
import pool from '../../config/db.js';

async function getAllUsers() {
    try {
        const result = await pool.query('SELECT id ,name ,email FROM users');
        return result.rows;
    }   catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
    
}

async function createUser(clerk_user_id, name, email) {
    try {
        const result = await pool.query(
    `INSERT INTO users (clerk_user_id, name, email)
     VALUES ($1, $2, $3)
     ON CONFLICT (clerk_user_id)
     DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email
     RETURNING id, clerk_user_id, name, email`,
    [clerk_user_id, name, email]
);

        return result.rows[0];

    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

async function getUserByClerkId(clerk_user_id) {
    try {
        const result = await pool.query(
            `SELECT id, clerk_user_id, name, email
             FROM users
             WHERE clerk_user_id = $1`,
            [clerk_user_id]
        );

        return result.rows[0];
    } catch (err) {
        console.error('Error fetching user:', err);
        throw err;
    }
}


export  { getAllUsers, createUser, getUserByClerkId };
