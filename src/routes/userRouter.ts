import express, { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDatabase";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { RelationsDatabase } from "../data/RelationsDatabase";
import { UserController } from "../controller/UserController";
import { User } from "../models/User";

export const userRouter = express.Router();
export const controller = new UserController();
userRouter.post("/signup", controller.signup);

userRouter.post("/login", controller.login);

userRouter.post(
    "/add",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.body.id;
      if (id) {
        const token = req.headers.authorization as string;
        const authenticator = new Authenticator();
        const authenticationData = authenticator.verifyToken(token);
        const userDb = new UserDatabase();
        const user = await userDb.getUserById(authenticationData.id);

        const followingDataBase = new RelationsDatabase();
        await followingDataBase.addFriend(user.id, id);

        res.status(200).send({
          message: "You are now friends!",
        });
      }
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
);

userRouter.delete("/remove", async (req: Request, res: Response): Promise<void> => {
  try{
    const id = req.body.id
    if(id){
      const token = req.headers.authorization as string;
      const authenticator = new Authenticator()
      const authenticationData = authenticator.verifyToken(token)
      const userDb = new UserDatabase()
      const user = await userDb.getUserById(authenticationData.id)

      const removeFriend = new RelationsDatabase()
      await removeFriend.removeFriend(user.id, id)

      res.status(200).send({
        message: "You're no longer friends"
      })
    }
    
  }
  catch(err) {
    res.status(400).send({
      message: err.message
    })
  }
  await BaseDatabase.destroyConnection()
})

userRouter.get("/friends", async (req: Request, res: Response): Promise<any> => {
  try{
    const token = req.headers.authorization as string

    const authenticator = new Authenticator()
    const authenticationData = authenticator.verifyToken(token)

    const userDb = new UserDatabase()
    const friends = await userDb.getFriends(authenticationData.id)

    res.status(200).send({
      friends
    })
  }
  catch(err){
    res.status(400).send({
      message: err.message
    })
  }
  BaseDatabase.destroyConnection()
})