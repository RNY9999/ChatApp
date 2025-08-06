import { Router } from "express";
import * as userController from "../controller/userController";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.post('/user', asyncHandler(userController.createUser));
router.get('/user', asyncHandler(userController.getUsers));

export default router;