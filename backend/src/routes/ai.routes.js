import express from 'express'
import getResponse from '../controller/ai/ai.controller.js';

const router = express.Router();

router.post('/doubt/ask', getResponse);

export default router;