import { SERVER_ENDPOINT, UserInformation } from "@/type";
import axios from "redaxios";

export async function fetchUserInformation(): Promise<UserInformation> {
  console.log("fetchUserInformation");
  const response = await axios.get(`${SERVER_ENDPOINT}/user-information`);
  return UserInformation.parse(response.data);
}
