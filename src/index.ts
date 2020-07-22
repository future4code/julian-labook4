import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { userRouter } from "./routes/userRouter";
import {PostRouter} from "./routes/postRouter"
import { UserDatabase } from "./data/UserDatabase";


dotenv.config();

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use("/create", PostRouter)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
