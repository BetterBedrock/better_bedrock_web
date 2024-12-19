import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!Tests!');
});

// Uncomment and adjust if you want to add more sub-routes in the future
// router.use('/automated', automatedRoutes);

export default router;
