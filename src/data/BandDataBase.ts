import BaseDataBase from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDataBase extends BaseDataBase {

   protected tableName: string = "LAMA_TABELA_BAND";

   private toModel(dbModel?: any): Band | undefined {
      return (
         dbModel &&
         new Band(
            dbModel.id,
            dbModel.name,
            dbModel.music_genre,
            dbModel.responsible
           
         )
      );
   }

   public async createBand(band: Band): Promise<void> {
      try {
         await BaseDataBase.connection.raw(`
            INSERT INTO ${this.tableName} (id, name, music_genre, responsible)
            VALUES (
            '${band.getId()}', 
            '${band.getName()}', 
            '${band.getMusicGenre()}',
            '${band.getResponsible()}' 
            
            )`
         );
      } catch (error) {
         throw new Error(error.sqlMessage || error.message)
      }
   }

   public async getBandById(id: string): Promise<Band| undefined> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName} WHERE id = '${id}'
         `);
         return this.toModel(result[0][0]);
      } catch (error) {
         throw new Error(error.sqlMessage || error.message)
      }
   }
}

export default new BandDataBase()