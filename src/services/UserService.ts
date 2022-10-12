import { SERVER_ENDPOINT, UserCart, UserInformation } from "@/type";
import axios from "redaxios";

export async function fetchUserInformation(): Promise<UserInformation> {
  const response = await axios.get(`${SERVER_ENDPOINT}/user-information`);
  return UserInformation.parse(response.data);
}

export async function fetchUserCart(): Promise<UserCart> {
  const response = await axios.get(`${SERVER_ENDPOINT}/user-cart`);
  return UserCart.parse(response.data);
}
