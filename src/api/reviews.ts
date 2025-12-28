import { api } from "./client";

/* ===== 타입 ===== */
export type TargetType = "HOSPITAL" | "FUNERAL";

export type ReviewApi = {
  reviewId: number;
  targetType: TargetType;
  targetId: number;
  targetName: string;
  rating: number;
  content: string;
  imageUrl?: string | null;
  writerNickname: string;
  createdAt: string;
  updatedAt: string;
  isMine: boolean;
};

/* ===== 병원/장례식장 리뷰 조회 ===== */
export const fetchReviewsByTarget = async (
  targetType: TargetType,
  targetId: number
): Promise<ReviewApi[]> => {
  const res = await api.get("/reviews", {
    params: { targetType, targetId },
  });
  return res.data.result ?? res.data;
};

/* ===== 리뷰 작성 ===== */
export const createReview = async (params: {
  targetType: TargetType;
  targetId: number;
  rating: number;
  content: string;
  imageFile?: File | null;
}) => {
  const formData = new FormData();

  const req = {
    targetType: params.targetType,
    targetId: params.targetId,
    rating: params.rating,
    content: params.content,
  };

  formData.append(
    "req",
    new Blob([JSON.stringify(req)], { type: "application/json" })
  );

  if (params.imageFile) {
    formData.append("image", params.imageFile);
  }

  return api.post("/reviews", formData);
};

/* ===== 마이페이지: 내 리뷰 ===== */
export const fetchMyReviews = async (): Promise<ReviewApi[]> => {
  const res = await api.get("/reviews/user");
  return res.data.result ?? res.data;
};

/* ===== 마이페이지: 리뷰 삭제 ===== */
export const deleteMyReview = async (reviewId: number) => {
  return api.delete(`/reviews/${reviewId}`);
};
