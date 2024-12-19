import express, { Request, Response } from 'express';
import cors from 'cors';
import testRoutes from './routes/test.routes';
import infoRoute from './routes/info.routes';
import downloadsRoute from './routes/downloads.routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({origin: 'http://localhost:3000'}));

app.use('/tests', testRoutes);
app.use('/downloads', downloadsRoute);
app.use('/info', infoRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
