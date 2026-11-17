import {getAllUsers, createUser} from './service.js';
import { getAuth } from '@clerk/express';
import { getUserByClerkId } from './service.js';

async function getAllUsersController(req, res) { 
    try{
        const users=await getAllUsers();
        res.status(200).json(users);
        
    }catch(err){
        console.error('Error in getAllUsersController:', err);
        res.status(500).json({ error: 'Internal Server Error' });   
    }};



async function getMyProfileController(req, res) {
    try {
        const { userId } = getAuth(req);

        const user = await getUserByClerkId(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User not found. Please sync your account.'
            });
        }

        res.status(200).json({
            message: 'Profile fetched successfully',
            user: user
        });

    } catch (err) {
        console.error('Error fetching profile:', err);

        res.status(500).json({
            error: 'Failed to fetch profile'
        });
    }
}

export {getAllUsersController,getMyProfileController};