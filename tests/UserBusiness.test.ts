import { UserBusiness } from "../src/business/UserBusiness"
import { User, UserRole } from "../src/model/User"


describe("Signup", () => {
   const idGenerator = { generate: jest.fn() } as any
   const hashGenerator = { hash: jest.fn() } as any
   const tokenGenerator = { generate: jest.fn() } as any
   const userDatabase = { createUser: jest.fn() } as any

   const userBusiness: UserBusiness = new UserBusiness(
      idGenerator,
      hashGenerator,
      tokenGenerator,
      userDatabase
   )

   test("Error when 'name' is empty", async () => {
      expect.assertions(2)

      try {
         await userBusiness.signup(
            "",
            "alice@lbn.com",
            "123456",
            "ADMIN"
         )
      } catch (error) {
         expect(error.statusCode).toBe(422)
         expect(error.message).toBe("Missing input")
      }
   })
})


describe("Login", () => {
    const idGenerator = {} as any
    const hashGenerator = {
       compareHash: jest.fn(
          () => false
       )
    } as any
    const tokenGenerator = { generate: jest.fn() } as any
    const userDatabase = {
       getUserByEmail: jest.fn(
          () => undefined
       )
    } as any
 
    const userBusiness: UserBusiness = new UserBusiness(
       idGenerator,
       hashGenerator,
       tokenGenerator,
       userDatabase
    )
    test("Error when 'email' is empty", async () => {
       expect.assertions(2)
       try {
 
          await userBusiness.login(
             "",
             "123456"
          )
       } catch (error) {
          expect(error.message).toBe("Missing input")
          expect(error.statusCode).toBe(422)
       }
    })
}) 