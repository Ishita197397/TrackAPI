import { getAuth ,clerkClient} from '@clerk/express';
import { createUser } from '../users/service.js';
async function getCurrentUser(req, res) {
    const authData = getAuth(req);
    const isAuthenticated = authData?.isAuthenticated;
    const userId = authData?.userId;

    if (!isAuthenticated) {
        return res.status(401).json({
            error: 'User not authenticated'
        });
    }

    res.status(200).json({
        message: 'User authenticated successfully',
        userId: userId
    });
}

async function syncCurrentUser(req, res) {
    try {
        // 1. Get authenticated user's Clerk ID
        const { isAuthenticated, userId } = getAuth(req);

        if (!isAuthenticated) {
            return res.status(401).json({
                error: 'User not authenticated'
            });
        }

        // 2. Fetch user details from Clerk
        const clerkUser = await clerkClient.users.getUser(userId);

        // 3. Extract name and primary email
        const name = [clerkUser.firstName, clerkUser.lastName]
            .filter(Boolean)
            .join(' ') || 'User';

        const primaryEmail = clerkUser.emailAddresses.find(
            email => email.id === clerkUser.primaryEmailAddressId
        );

        const email = primaryEmail?.emailAddress;

        if (!email) {
            return res.status(400).json({
                error: 'User does not have a primary email'
            });
        }

        // 4. Save user in PostgreSQL
        const user = await createUser(userId, name, email);

        res.status(200).json({
            message: 'User synced successfully',
            user: user
        });

    } catch (err) {
        console.error('Error syncing user:', err);

        res.status(500).json({
            error: 'Failed to sync user'
        });
    }
}



export { getCurrentUser, syncCurrentUser };