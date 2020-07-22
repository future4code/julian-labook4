import express,{Request, Response} from "express";
import { create } from "../business/controller/PostController";
import { Authenticator } from "../services/Authenticator";
import { PostDatabase } from "../data/PostDatabase";
import moment from "moment";
import { BaseDatabase } from "../data/BaseDatabase";

export const PostRouter = express.Router();

PostRouter.post("/create", create);

PostRouter.get("/feed", async (req: Request, res: Response): Promise<any> => {
  try {
    const authenticator = new Authenticator()
    authenticator.getData(req.headers.authorization!)

    const postDb = new PostDatabase()
    const postFeed = await postDb.getPosts()
    
    const feeds = postFeed.map((feed: any) => {
      feed.creation_date = moment(feed.creation_date).format("DD/MM/YYYY")
      return feed
    })
    
  
    res.status(200).send({
      feeds
    })
  } catch (err) {
    res.status(400).send({
      message: err.message
    })
  }
  await BaseDatabase.destroyConnection()
})
