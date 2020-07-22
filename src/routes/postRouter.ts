
import express from "express";
import { create, getPostByType } from "../business/controller/PostController";
export const PostRouter = express.Router();

PostRouter.post("/create", create);

PostRouter.get("/", getPostByType)