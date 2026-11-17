import app from './src/app.js';
import { clerkMiddleware } from '@clerk/express'

const PORT = process.env.PORT || 3000;
app.use(clerkMiddleware())
app.listen(PORT, () => {
    console.log(`TrackAPI running on port ${PORT}`);
});