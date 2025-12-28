import { api } from "./client";

/* ================= 회원가입 ================= */

export interface SignupRequest {
  phoneNumber: string;
  password: string;
  name: string;
  nickname: string;
  birthDate: string;
  gender: "MALE" | "FEMALE";
  address: string;
}

export const signupUser = (data: SignupRequest) => {
  return api.post("/users/signup", data);
};

/* ================= 마이페이지 ================= */

export type GenderAPI = "MALE" | "FEMALE";

export type UserProfile = {
  email: string;
  phoneNumber: string;
  nickname: string;
  provider: "LOCAL" | "KAKAO" | "NAVER" | string;
  birthDate: string;
  gender: GenderAPI;
  address: string;
  profileImage: string | null;
};

type ApiEnvelope<T> = {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  result: T;
  success: boolean;
};

/* 프로필 조회 */
export async function fetchMyProfile(): Promise<UserProfile> {
  const res = await api.get<ApiEnvelope<UserProfile>>("/users/profile");
  return res.data.result;
}

/* 프로필 수정 */
export type UpdateProfileBody = {
  nickname: string;
  name: string;
  birthDate: string;
  gender: GenderAPI;
  address: string;
};

export async function updateMyProfile(
  body: UpdateProfileBody
): Promise<UserProfile> {
  const res = await api.patch<ApiEnvelope<UserProfile>>(
    "/users/profile",
    body
  );
  return res.data.result;
}

/* 비밀번호 변경 */
export type ChangePasswordBody = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export async function changeMyPassword(
  body: ChangePasswordBody
): Promise<void> {
  await api.patch("/users/profile/password", body);
}

/* 프로필 이미지 */
export async function uploadProfileImage(file: File): Promise<UserProfile> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.patch<ApiEnvelope<UserProfile>>(
    "/users/profile/image",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return res.data.result;
}

export async function deleteProfileImage(): Promise<void> {
  await api.delete("/users/profile/image");
}

export async function withdrawMe(): Promise<void> {
  await api.delete("/users/profile");
}
