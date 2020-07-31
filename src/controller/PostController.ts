import {BaseDatabase} from '../data/BaseDatabase'
import {Authenticator} from "../services/Authenticator";
import {IdGenerator} from "../services/IdGenerator";
import {GetPostByTypeDTO, Post} from '../models/Post'
import {PostDatabase} from '../data/PostDatabase'
import moment from "moment";
import express, {Request, Response} from "express";

export const create = async (req: Request, res: Response) => {
  try {

    const authenticator = new Authenticator();
    const tokenData = authenticator.getData(req.headers.authorization!);

     if (!req.body.photo || !req.body.description || !req.body.type) {
       throw new Error("Invalid");
     }

    const idGenerator = new IdGenerator()
    const id = idGenerator.generate()  
    const today = moment().format('YYYY-MM-DD');  
    const postData = {
      photo: req.body.photo,
      description: req.body.description,
      type: req.body.type
    }

    const postDb = new PostDatabase()
    await postDb.createPosts(
      id,
      postData.photo,
      postData.description,
      today,
      postData.type,
      tokenData.id
    )

    res.status(200).send({
      message: "Post Criado"
    })

  } catch (err) {
    res.status(400).send({
      mesage: err.message
    })
  }
  BaseDatabase.destroyConnection()
};

export const getPostByType = async (req: Request, res: Response) => {
  try{
    const postData: GetPostByTypeDTO = {
      type: req.query.type as string,
      orderBy: req.query.orderBy as string || "creation_date",
      orderType: req.query.orderType as string || "ASC"
    }

    const posts: Post[] = await new PostDatabase().getPostByType(postData)

    res.status(200).send({
      posts
    })
  }
  catch(err) {
    message: err.message
  }
  BaseDatabase.destroyConnection()
}