import { BaseDatabase } from "./BaseDatabase";

export class RelationsDatabase extends BaseDatabase {
  public static TABLE_NAME = "Relations";

  public async addFriend(user_id: string, friend_id: string): Promise<void> {
    await this.getConnection().raw(`
    INSERT INTO ${RelationsDatabase.TABLE_NAME} VALUES ("${user_id}", "${friend_id}")
    `);
  }
}
