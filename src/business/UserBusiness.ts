import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";

export class UserBusiness {
  async signup(name: string, email: string, password: string) {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(id, name, email, password);
  }
}
