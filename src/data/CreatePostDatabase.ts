import { BaseDatabase } from "./BaseDatabase";



export class CreatePostDatabase extends BaseDatabase {
    CreatePostDatabase(arg0: string, CreatePostDatabase: any) {
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
      .into(CreatePostDatabase.TABLE_NAME);

      
    }

    public async getPostById(id: string): Promise<any> {
      const result = await this.getConnection()
        .select("*")
        .from(CreatePostDatabase.TABLE_NAME)
        .where({ id });

        return result[0];
    }  
}