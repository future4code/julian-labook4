import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

export const controller = new UserController();

userRouter.post("/signup", controller.signup);

userRouter.post("/login", controller.login);

userRouter.post("/add", controller.addFriend);

userRouter.delete("/remove", controller.removeFriend);

userRouter.get("/friends", controller.getFriends);
