import { CustomError } from "../errors/CustomError";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import tokenGenerator, { TokenGenerator } from "../services/tokenGenerator";
import bandDataBase,{ BandDataBase } from "../data/BandDataBase";
import { Band } from "../model/Band";


export class BandBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private tokenGenerator: TokenGenerator,
      private bandDatabase:BandDataBase
   ){}

   public async createBand(
      name: string,
      music_genre: string,
      responsible: string
      
   ) {
    let message= "Success!"
      try {
         if (!name || !music_genre || !responsible ) {
            throw new CustomError(422, "Missing input");
         }

         const id = this.idGenerator.generate();
         
         await this.bandDatabase.createBand(
            new Band(id, name, music_genre, responsible)
         );
         const tokenData = this.tokenGenerator.generate({
             id
         });

        return { message ,tokenData};
      } catch (error) {
         throw new CustomError(error.statusCode, error.message)
      }

   }
}

export default new BandBusiness(
    idGenerator,
    tokenGenerator,
    bandDataBase
 )
