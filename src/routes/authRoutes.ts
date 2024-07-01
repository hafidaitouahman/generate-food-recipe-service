import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { Express, Request, Response} from 'express';

const userRouter = Router();

userRouter.post("/register", AuthController.register);
userRouter.post("/login", AuthController.login);

export default userRouter;