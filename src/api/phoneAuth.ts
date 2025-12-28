import api from "./axios";

/* 인증번호 전송 */
export const sendPhoneCode = (phoneNumber: string) => {
  return api.post("/auth/phone/send", {
    phoneNumber, // ✅ Swagger와 일치
  });
};

/* 인증번호 검증 */
export const verifyPhoneCode = (phoneNumber: string, code: string) => {
  return api.post("/auth/phone/verify", {
    phoneNumber, // ✅ Swagger와 일치
    code,
  });
};
