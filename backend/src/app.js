import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}))

app.use(express.json());
app.use(cookieParser());

import userRoutes from './routes/user.routes.js'
import aiRoutes from './routes/ai.routes.js'
import otpRoutes from './routes/otp.routes.js'

app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', otpRoutes);

export default app