import { api } from "./client";

/* ================= 공통 응답 타입 ================= */

type ApiEnvelope<T> = {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  result: T;
  success: boolean;
};

/* ================= 예약 조회 타입 ================= */

export type ApiReservation = {
  reservationId: number;
  reservationNumber: string;
  ownerName: string;
  phoneNumber: string;
  targetType: "HOSPITAL" | "FUNERAL";
  targetId: number;
  targetName: string;
  petName: string;
  reservationDate: string;
  reservationTime: {
    hour: number;
    minute: number;
  };
  visitReason: string;
  status: "RESERVED" | "CANCELED";
};

/* ================= 예약 생성 타입 ================= */

export type CreateReservationBody = {
  targetType: "HOSPITAL" | "FUNERAL";
  targetId: number;
  ownerName: string;
  phoneNumber: string;
  petName: string;
  reservationDate: string;
  reservationTime: {
    hour: number;
    minute: number;
  };
  visitReason: string;
};

/* ================= API ================= */

/** 내 예약 목록 조회 */
export async function fetchMyReservations(): Promise<ApiReservation[]> {
  const res = await api.get<ApiEnvelope<ApiReservation[]>>(
    "/reservations/user"
  );
  return res.data.result ?? [];
}

/** 예약 생성 */
export async function createReservation(
  body: CreateReservationBody
): Promise<ApiReservation> {
  const res = await api.post<ApiEnvelope<ApiReservation>>(
    "/reservations",
    body
  );
  return res.data.result;
}

/** 예약 취소 */
export async function cancelReservation(
  reservationId: number
): Promise<void> {
  await api.delete(`/reservations/${reservationId}`);
}
