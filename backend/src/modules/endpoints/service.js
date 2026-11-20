
import pool from "../../config/db.js";

async function getAllEndpoints(userID) {
    try {
        const result = await pool.query(
            `SELECT id, name, method, url, interval, is_active,
                    created_at, updated_at
             FROM monitored_endpoints
             WHERE user_id = $1`,
            [userID]
        );

        return result.rows;

    } catch (err) {
        console.error("Error fetching endpoints:", err);
        throw err;
    }
}

async function createEndpoint(name, method, url, interval, userId) {
    try {
        const result = await pool.query(
            `INSERT INTO monitored_endpoints
             (name, method, url, interval, user_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, user_id, name, method, url, interval,
                       is_active, created_at, updated_at`,
            [name, method, url, interval, userId]
        );

        return result.rows[0];

    } catch (err) {
        console.error("Error creating endpoint:", err);
        throw err;
    }
}

async function updateEndpoint(userID, id, name, method, url, interval) {
    try {
        const result = await pool.query(
            `UPDATE monitored_endpoints
             SET name = COALESCE($1, name),
                 method = COALESCE($2, method),
                 url = COALESCE($3, url),
                 interval = COALESCE($4, interval),
                 updated_at = CURRENT_TIMESTAMP
             WHERE user_id = $5 AND id = $6
             RETURNING id, user_id, name, method, url, interval,
                       is_active, created_at, updated_at`,
            [name, method, url, interval, userID, id]
        );

        return result.rows[0];

    } catch (err) {
        console.error("Error updating endpoint:", err);
        throw err;
    }
}



async function deleteEndpoint(userID, id) {
    try {
        const result = await pool.query(
            `DELETE FROM monitored_endpoints
             WHERE user_id = $1 AND id = $2
             RETURNING id, user_id, name, method, url, interval,
                       is_active, created_at, updated_at`,
            [userID, id]
        );

        return result.rows[0];

    } catch (err) {
        console.error("Error deleting endpoint:", err);
        throw err;
    }
}

// Get a specific endpoint
async function getEndpointById(userID, id) {
    try {
        const result = await pool.query(
            `SELECT id, user_id, name, method, url, interval,
                    is_active, created_at, updated_at
             FROM monitored_endpoints
             WHERE user_id = $1 AND id = $2`,
            [userID, id]
        );

        return result.rows[0];

    } catch (err) {
        console.error("Error fetching endpoint by ID:", err);
        throw err;
    }
}

export {
    getAllEndpoints,
    getEndpointById,
    createEndpoint,
    updateEndpoint,
    deleteEndpoint
};
