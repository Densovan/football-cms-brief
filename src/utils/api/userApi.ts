import { Profile } from "../types";
import request from "./axios";
export const USER_PROFILE = async (): Promise<Profile> => {
  return await request({
    url: "/user/me",
    method: "GET",
  });
};
