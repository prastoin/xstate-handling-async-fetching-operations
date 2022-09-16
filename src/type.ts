import * as z from "zod"

export const UserInformation = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})
export type UserInformation =  z.infer<typeof UserInformation>

export const SERVER_ENDPOINT = "http://localhost:3333"

export const FetchUserInformationResponseBody = UserInformation
export type FetchUserInformationResponseBody = z.infer<typeof FetchUserInformationResponseBody>