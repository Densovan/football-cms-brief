import { AuthLoginForm, LoginType } from "../types";
import request from "./axios";
export const LOGIN_USER = async (data: AuthLoginForm): Promise<LoginType> => {
  console.log(data, "data====");
  return await request({
    url: "/auth/login",
    method: "POST",
    data,
  });
};
