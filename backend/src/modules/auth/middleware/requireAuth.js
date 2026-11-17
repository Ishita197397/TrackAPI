import { getAuth } from '@clerk/express';

function requireUserAuth(req, res, next) {
    const { isAuthenticated } = getAuth(req);

    if (!isAuthenticated) {
        return res.status(401).json({
            error: 'User not authenticated'
        });
    }

    next();
}

export default requireUserAuth;
