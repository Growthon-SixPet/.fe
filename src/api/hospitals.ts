import { publicApi } from "./publicclient";

/* ================== 공통 응답 타입 ================== */
export type ApiResponse<T> = {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  result: T;
  success?: boolean;
};

/* ================== 병원 타입 ================== */
export type Hospital = {
  hospitalId: number;
  name: string;
  address: string;
  phone: string;
  open24h: boolean;
  nightCare: boolean;
  isOpenNow: boolean;
  ratingAvg: number;
  reviewCount: number;
  mainImageUrl: string | null;
  amenities: string[];
};

export type HospitalPage = {
  content: Hospital[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;
};

export type RegionEnum =
  | "SEOUL"
  | "INCHEON_GYEONGGI"
  | "GANGWON"
  | "CHUNGCHEONG"
  | "JEOLLA"
  | "GYEONGSANG"
  | "JEJU";

/* ================== 검색 ================== */
export type HospitalSearchParams = {
  keyword?: string;
  region?: RegionEnum;
  specialty?: string;
  animalType?: string;
  open24h?: boolean;
  nightCare?: boolean;
  sortType?: "RATING_DESC" | "REVIEWS_DESC";
  page?: number;
  size?: number;
};

export type HospitalSearchBasicParams = {
  keyword?: string;
  region?: RegionEnum;
  page?: number;
  size?: number;
};

export async function fetchHospitals(params: HospitalSearchParams) {
  const res = await publicApi.get<ApiResponse<HospitalPage>>("/hospitals", {
    params,
  });
  return res.data;
}

export async function fetchHospitalsBasic(params: HospitalSearchBasicParams) {
  const res = await publicApi.get<ApiResponse<HospitalPage>>(
    "/hospitals/search",
    { params }
  );
  return res.data;
}

/* ================== 병원 상세 ================== */
export async function fetchHospitalDetail(hospitalId: number) {
  const res = await publicApi.get<ApiResponse<Hospital>>(
    `/hospitals/${hospitalId}`
  );
  return res.data.result;
}

export async function fetchHospitalHours(hospitalId: number) {
  const res = await publicApi.get<ApiResponse<any>>(
    `/hospitals/${hospitalId}/hours`
  );
  return res.data.result;
}

export async function fetchHospitalNews(hospitalId: number) {
  const res = await publicApi.get<ApiResponse<any>>(
    `/hospitals/${hospitalId}/news`
  );
  return res.data.result;
}
