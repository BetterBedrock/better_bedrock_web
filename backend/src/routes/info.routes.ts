import express, { Request, Response } from 'express';
import { BUILD_VERSION, DISCORD_LINK, STATUS, STATUS_MESSAGE } from '../constants/global';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ discord: DISCORD_LINK, status: STATUS, status_message: STATUS_MESSAGE, buildVersion: BUILD_VERSION });
});

export default router;
