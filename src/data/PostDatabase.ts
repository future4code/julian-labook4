import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    PostDatabase(arg0: string, PostDatabase: any) {
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
      .into(PostDatabase.TABLE_NAME);
    
    }

    public async getPosts(): Promise<any> {
      const result = await this.getConnection()
        .select("*")
        .from(PostDatabase.TABLE_NAME);
        

        return result;
    }  

    
  }
