import api from "./axios";

export const login = (phoneNumber: string, password: string) => {
  return api.post("/auth/login", {
    phoneNumber,
    password,
  });
};
