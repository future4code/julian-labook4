import { BaseDatabase } from "./BaseDatabase";
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