import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";



 class UserDatabase extends BaseDatabase {

  private static TABLE_NAME:string = "LAMA_TABELA_USER";
  public getTableName = (): string => UserDatabase.TABLE_NAME
  public async signup(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<any> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }

}
export default new UserDatabase()
