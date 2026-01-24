import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import { env } from './configs/env.ts';
import router from './routes/index.ts';

const PORT = env.API_PORT;
const WEB_URL = env.API_WEB_URL;

const app = express();

app.use(express.json());
const server = http.createServer(app);
app.use(cookieParser());

app.use(
    cors({
        origin: WEB_URL,
        credentials: true,
    }),
);

app.use('/api/v1', router);

server.listen(PORT, () => {
    console.warn('Application started at port : ', PORT);
});
