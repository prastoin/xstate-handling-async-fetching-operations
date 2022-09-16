import { FetchUserInformationResponseBody, SERVER_ENDPOINT } from '@/type'
import { rest } from 'msw'
import { faker } from "@faker-js/faker"

export const handlers = [
    rest.get<
        undefined,
        Record<string, never>,
        FetchUserInformationResponseBody
    >(`${SERVER_ENDPOINT}/user-information`, (req, res, ctx) => {
        // Persist user's authentication in the session
        console.log("HANDLER MOCK CALLEd")
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json({
                email: faker.internet.email(),
                id: faker.datatype.uuid(),
                name: faker.internet.userName(),
                password: faker.internet.password()
            })
        )
    }),
]