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

async function createUser(name , email ,password_hash ){
    try{
        const result= await pool.query('INSERT INTO users (name , email ,password_hash ) VALUES ($1,$2,$3) RETURNING id , name , email', [name, email, password_hash]);
        return result.rows[0];
    } catch (err){
        console.error('Error creating user:', err);
        throw err;
    }

}

export  { getAllUsers, createUser };
