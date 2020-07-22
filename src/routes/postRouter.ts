
import express from "express";
import { create } from "../business/controller/PostController";

export const PostRouter = express.Router();

PostRouter.post("/create", create);