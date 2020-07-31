import { BaseDatabase } from "./BaseDatabase";

export class RelationsDatabase extends BaseDatabase {
  public static TABLE_NAME = "Relations";

  public async addFriend(user_id: string, friend_id: string): Promise<void> {
    await this.getConnection().raw(`
    INSERT INTO ${RelationsDatabase.TABLE_NAME} VALUES ("${user_id}", "${friend_id}")
    `);
  }

  public async removeFriend(user_id: string, friend_id: string): Promise<void> {
    await this.getConnection().raw(`
      DELETE FROM ${RelationsDatabase.TABLE_NAME} WHERE user_id = "${user_id}" AND friend_id = "${friend_id}"
    `)
  }
}
