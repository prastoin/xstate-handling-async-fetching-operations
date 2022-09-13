import type { UserInformation } from "@/type";

export async function fetchUserInformation(): Promise<UserInformation> {
    console.log("fetchUserInformation")
    return {
        email: "",
        id: "",
        name: "",
        password: ""
    }
}