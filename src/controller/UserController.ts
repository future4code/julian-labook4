import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { User } from "../models/User";
import { Authenticator } from "../services/Authenticator";

export class UserController {
  public async signup(req: Request, res: Response) {
    try {
      if (!req.body.password || req.body.password.length < 6) {
        throw new Error("Your passwords needs at least 6 characters!");
      }

      const userData = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      };

      if (req.body.email.indexOf("@") === -1) {
        throw new Error("Please, provide a valid email address");
      }

      const hashManager = new HashManager();
      const cipherText = await hashManager.hash(userData.password);

      const userBusiness = new UserBusiness();
      await userBusiness.signup(userData.name, userData.email, cipherText);

      res.status(200).send({
        message: `User ${userData.name} created successfully`,
      });
    } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    }
    BaseDatabase.destroyConnection();
  }

  public async login(req: Request, res: Response) {
    try {
      if (!req.body.email || req.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }

      const userData = {
        email: req.body.email,
        password: req.body.password,
      };

      const userDatabase = new UserDatabase();
      const user: User = await userDatabase.userInfo(userData.email);

      const hashManager = new HashManager();
      const comparePassword = await hashManager.compare(
        userData.password,
        user.getPassword()
      );

      if (!comparePassword) {
        throw new Error("Invalid password");
      }

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id: user.getId(),
      });

      res.status(200).send({ token });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
    BaseDatabase.destroyConnection();
  }
}
