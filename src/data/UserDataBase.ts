import BaseDataBase from "./BaseDatabase";
import { User } from "../model/User";

export class UserDataBase extends BaseDataBase {

   protected tableName: string = "LAMA_TABELA_USER";

   private toModel(dbModel?: any): User | undefined {
      return (
         dbModel &&
         new User(
            dbModel.id,
            dbModel.name,
            dbModel.email,
            dbModel.password,
            dbModel.role
         )
      );
   }

   public async createUser(user: User): Promise<void> {
      try {
         await BaseDataBase.connection.raw(`
            INSERT INTO ${this.tableName} (id, name, email, password, role)
            VALUES (
            '${user.getId()}', 
            '${user.getName()}', 
            '${user.getEmail()}',
            '${user.getPassword()}', 
            '${user.getRole()}'
            )`
         );
      } catch (error) {
         throw new Error(error.sqlMessage || error.message)
      }
   }

   public async getUserByEmail(email: string): Promise<User | undefined> {
    try {
       const result = await BaseDataBase.connection.raw(`
          SELECT * from ${this.tableName} WHERE email = '${email}'
       `);
       return this.toModel(result[0][0]);
    } catch (error) {
       throw new Error(error.sqlMessage || error.message)
    }
 }

  }
  export default new UserDataBase()