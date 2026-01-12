import express from "express";
import { completeTopic, editDescription, getUser, loginUser, logoutUser, signupUser } from "../controller/user.controller.js";

const router = express.Router();

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/getuser', getUser);
router.put('/topic/completed', completeTopic);
router.put('/description/edit', editDescription);

export default router