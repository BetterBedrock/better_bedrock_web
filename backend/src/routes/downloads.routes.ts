import express, { Request, Response } from 'express';
import { BUILD_VERSION, DISCORD_LINK, STATUS, STATUS_MESSAGE } from '../constants/global';
import { DOWNLOAD_LIST } from '../constants/download';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ download_list: DOWNLOAD_LIST });
});

export default router;
