import { BaseDatabase } from "./BaseDatabase";
import { GetPostByTypeDTO } from "../models/Post";
<<<<<<< HEAD

<<<<<<<< HEAD:src/data/PostDatabase.ts
export class PostDatabase extends BaseDatabase {
    getPostByType(postData: GetPostByTypeDTO): import("../models/Post").Post[] | PromiseLike<import("../models/Post").Post[]> {
      throw new Error("Method not implemented.");
    }
    getPosts: any;
    createPosts(id: string, photo: any, description: any, today: string, type: any, id: string) {
      throw new Error("Method not implemented.");
    }
    PostDatabase(arg0: string, PostDatabase: any) {
========

export class CreatePostDatabase extends BaseDatabase {
    CreatePostDatabase(arg0: string, CreatePostDatabase: any) {
>>>>>>>> master:src/data/CreatePostDatabase.ts
      throw new Error("Method not implemented.");
    }
       
    private static TABLE_NAME = "Posts";

    public async createPosts(
      id: string,
      photo: string,
      description: string,
      creation_date: string,
      type: string,
      creator_user_id: string
          
    ): Promise<void> {
      await this.getConnection()
      .insert({
        id,
        photo,
        description,
        creation_date,
        type,
        creator_user_id
      })
<<<<<<<< HEAD:src/data/PostDatabase.ts
      .into(PostDatabase.TABLE_NAME);
    
    }

    public async getPosts(): Promise<any> {
      const result = await this.getConnection()
        .select("*")
        .from(PostDatabase.TABLE_NAME);
        

        return result;
    }  

    
  }
========
      .into(CreatePostDatabase.TABLE_NAME);
    } 
}
>>>>>>>> master:src/data/CreatePostDatabase.ts
=======
import {Post, GetPostByTypeDTO} from '../models/Post'

export class PostDatabase extends BaseDatabase {
    private static TABLE_NAME = "Posts";

    public async getPostById(id: string): Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(PostDatabase.TABLE_NAME)
            .where({ id });

        return result[0];
    }

    public async getPostByType(postData: GetPostByTypeDTO): Promise<Post[]> {
        const posts = await this.getConnection()
            .select("*")
            .from(PostDatabase.TABLE_NAME)
            .where({type: postData.type})
            .orderBy(postData.orderBy, postData.orderType)

        return posts
    }
}
>>>>>>> master
