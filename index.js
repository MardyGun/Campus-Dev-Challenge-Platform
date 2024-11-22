import express from 'express';
import dotenv from 'dotenv';
import createTables from './database/createTable.js';
import userRouter from './routes/user.js';
import submissionRouter from './routes/submission.js';
import leaderboardRouter from './routes/leaderboard.js';
import authMiddleware from './middlewares/auth.js';
import utilityRouter from './routes/utility.js';
import taskRouter from './routes/task.js';
import cors from './service/cors.js';

dotenv.config();

const app = express();

// -------Middlewares-------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors);

const PORT = process.env.PORT || 3000;

// Connect DB
createTables();

// -------Routes--------
app.get('/ping', (_, res) => {
  res.status(200).json('pong');
});

app.use('/user', userRouter);
app.use('/submission', authMiddleware.checkForAuthentication, submissionRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/utility', utilityRouter);
app.use('/task', taskRouter);

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
