import { SERVER_ENDPOINT, UserInformation, } from "@/type";
import axios from "redaxios"

export async function fetchUserInformation(): Promise<UserInformation> {
    console.log("fetchUserInformation")
    const url = `${SERVER_ENDPOINT}/user-information`
    const response = await axios.get(url);
    const user = UserInformation.parse(response.data)
    console.log({ user })

    return user
}