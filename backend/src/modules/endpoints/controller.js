
import { getAuth } from '@clerk/express';

import { getUserByClerkId } from '../users/service.js';

import {
    getAllEndpoints,
    getEndpointById,
    createEndpoint,
    updateEndpoint,
    toggleEndpointStatus,
    deleteEndpoint
} from './service.js';


// Get all endpoints belonging to the logged-in user
async function getAllEndpointsController(req, res) {
    try {
        const { userId: clerkUserId } = getAuth(req);
        const user = await getUserByClerkId(clerkUserId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const endpoints = await getAllEndpoints(user.id);

        return res.status(200).json(endpoints);

    } catch (error) {
        console.error('Error fetching endpoints:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Get a specific endpoint by ID
async function getEndpointByIdController(req, res) {
    try {
        const { userId: clerkUserId } = getAuth(req);
        const user = await getUserByClerkId(clerkUserId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { id } = req.params;

        const endpoint = await getEndpointById(user.id, id);

        if (!endpoint) {
            return res.status(404).json({ error: 'Endpoint not found' });
        }

        return res.status(200).json(endpoint);

    } catch (error) {
        console.error('Error fetching endpoint:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Register a new endpoint
async function createEndpointController(req, res) {
    try {
        const { userId: clerkUserId } = getAuth(req);
        const user = await getUserByClerkId(clerkUserId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { name, method, url, interval } = req.body;

        const endpoint = await createEndpoint(
            name,
            method,
            url,
            interval,
            user.id
        );

        return res.status(201).json(endpoint);

    } catch (error) {
        console.error('Error creating endpoint:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Update endpoint details
async function updateEndpointController(req, res) {
    try {
        const { userId: clerkUserId } = getAuth(req);
        const user = await getUserByClerkId(clerkUserId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { id } = req.params;
        const { name, method, url, interval } = req.body;

        if (
            name === undefined &&
            method === undefined &&
            url === undefined &&
            interval === undefined
        ) {
            return res.status(400).json({
                error: 'At least one field is required to update'
            });
        }

        const updatedEndpoint = await updateEndpoint(
            user.id,
            id,
            name ?? null,
            method ?? null,
            url ?? null,
            interval ?? null
        );

        if (!updatedEndpoint) {
            return res.status(404).json({ error: 'Endpoint not found' });
        }

        return res.status(200).json(updatedEndpoint);

    } catch (error) {
        console.error('Error updating endpoint:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Pause or resume endpoint monitoring
async function toggleEndpointStatusController(req, res) {
    try {
        const { userId: clerkUserId } = getAuth(req);
        const user = await getUserByClerkId(clerkUserId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { id } = req.params;

        const endpoint = await toggleEndpointStatus(user.id, id);

        if (!endpoint) {
            return res.status(404).json({ error: 'Endpoint not found' });
        }

        return res.status(200).json(endpoint);

    } catch (error) {
        console.error('Error toggling endpoint status:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Delete an endpoint
async function deleteEndpointController(req, res) {
    try {
        const { userId: clerkUserId } = getAuth(req);
        const user = await getUserByClerkId(clerkUserId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { id } = req.params;

        const deletedEndpoint = await deleteEndpoint(user.id, id);

        if (!deletedEndpoint) {
            return res.status(404).json({ error: 'Endpoint not found' });
        }

        return res.status(200).json({
            message: 'Endpoint deleted successfully',
            endpoint: deletedEndpoint
        });

    } catch (error) {
        console.error('Error deleting endpoint:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


export {
    getAllEndpointsController,
    getEndpointByIdController,
    createEndpointController,
    updateEndpointController,
    toggleEndpointStatusController,
    deleteEndpointController
};
