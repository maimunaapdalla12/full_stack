import express from 'express';
import connectDB from './config/db.js';
import chalk from 'chalk';
import userRouter from './routers/user.js'
import cookiesParser from 'cookie-parser';
import PostRouter from './routers/postRouter.js';
// import PostRouter from './routers/postRouter.js';

const app = express();
const PORT = 4000;

// Connect to the databas
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cookiesParser());

// Define routes
app.use('/api/user', userRouter);

app.use('/api/posts', PostRouter);

// Start the server
app.listen(PORT, () => {
    console.log(chalk.gray.bold(`Server is running on: ${chalk.green.bold(PORT)}`));
});
