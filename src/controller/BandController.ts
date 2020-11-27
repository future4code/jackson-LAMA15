import { Request, Response } from "express";
import bandBusiness,{ BandBusiness } from "../business/BandBusiness";


export class BandController {

   constructor(
      private bandBusiness: BandBusiness
   ) { }

   public async createBand(req: Request, res: Response) {
      try {
         const { name, music_genre, responsible } = req.body
         const result = await bandBusiness.createBand(
            name,
            music_genre,
            responsible
            
         );
         res.status(200).send(result);
      } catch (error) {
         const { statusCode, message } = error
         res.status(statusCode || 400).send({ message });
      }
   }

}
export default new BandController(bandBusiness)