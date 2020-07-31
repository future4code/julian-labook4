import { BaseDatabase } from "./BaseDatabase";
import { GetPostByTypeDTO, Post } from "../models/Post";


export class PostDatabase extends BaseDatabase {
  
    
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
      .into(PostDatabase.TABLE_NAME);
      
    }

    public async getPosts(): Promise<any> {
      const result = await this.getConnection()
        .select("*")
        .from(PostDatabase.TABLE_NAME);
        
        return result;
    }  
     
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