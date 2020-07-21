import { BaseDatabase } from "./BaseDatabase";
import { RelationsDatabase } from "./RelationsDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_NAME = "LaBook_Users";

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password,
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async userInfo(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }

  public async deleteUser(id: string): Promise<void> {
    await this.getConnection().raw(`
    DELETE FROM ${UserDatabase.TABLE_NAME} WHERE id = "${id}"`);
  }

  public async getInfoById(id: string): Promise<any> {
    const info = await this.getConnection().raw(`
    SELECT id, email FROM ${UserDatabase.TABLE_NAME} WHERE id = "${id}"`);

    return info[0];
  }

  public async getFriends(id: string): Promise<any> {
    const followers = await this.getConnection().raw(`
      SELECT friend_id FROM ${RelationsDatabase.TABLE_NAME} WHERE user_id = "${id}"`);

    return followers[0];
  }
}
