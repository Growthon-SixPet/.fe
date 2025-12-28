import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  fetchHospitalDetail,
  fetchHospitalHours,
  fetchHospitalNews,
} from "../../api/hospitals";

import {
  fetchReviewsByTarget,
  createReview,
} from "../../api/reviews";

import ReservationModal from "./components/ReservationModal";
import "./HospitalDetail.module.css";

/* ================= 타입 ================= */

type Hour = {
  day: string;
  openTime: string;
  closeTime: string;
};

type News = {
  newsId: number;
  title: string;
  content: string;
  createdAt: string;
};

type Review = {
  reviewId: number;
  rating: number;
  content: string;
  imageUrl: string | null;
  writerNickname: string;
  createdAt: string;
};

/* ================= 컴포넌트 ================= */

export default function HospitalDetail() {
  const { id } = useParams<{ id: string }>();
  const hospitalId = Number(id);

  const [tab, setTab] = useState<"news" | "doctors" | "reviews">("news");
  const [hospital, setHospital] = useState<any>(null);
  const [hours, setHours] = useState<Hour[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewLoaded, setReviewLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openReservation, setOpenReservation] = useState(false);

  /* 리뷰 작성 상태 */
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  /* 병원 기본 정보 */
  useEffect(() => {
    if (!hospitalId) return;

    Promise.all([
      fetchHospitalDetail(hospitalId),
      fetchHospitalHours(hospitalId),
      fetchHospitalNews(hospitalId),
    ])
      .then(([h, hrs, news]) => {
        setHospital(h);
        setHours(hrs ?? []);
        setNews(news ?? []);
      })
      .finally(() => setLoading(false));
  }, [hospitalId]);

  /* 리뷰 로드 */
  const loadReviews = async () => {
    if (reviewLoaded) return;
    const list = await fetchReviewsByTarget("HOSPITAL", hospitalId);
    setReviews(list ?? []);
    setReviewLoaded(true);
  };

  /* 리뷰 등록 */
  const submitReview = async () => {
    if (!rating || !content) {
      alert("별점과 내용을 입력하세요");
      return;
    }

    await createReview({
      targetType: "HOSPITAL",
      targetId: hospitalId,
      rating,
      content,
      imageFile,
    });

    setRating(0);
    setContent("");
    setImageFile(null);
    setReviewLoaded(false);
    loadReviews();
  };

  if (loading || !hospital) return <div>로딩중...</div>;

  return (
    <>
      <div className="page-wrapper">
        <div className="page">
          {/* 상단 병원 정보 */}
          <div className="top-card">
            <div className="image-box">
              {hospital.mainImageUrl ? (
                <img src={hospital.mainImageUrl} />
              ) : (
                <div className="image-placeholder">이미지 없음</div>
              )}
            </div>

            <div className="info-box">
              <div className="title-row">
                <h2>{hospital.name}</h2>
                <span className="rating">
                  ⭐ {hospital.ratingAvg} ({hospital.reviewCount})
                </span>
              </div>

              <p className="desc">{hospital.description}</p>
              <p className="sub">📍 {hospital.address}</p>
              <p className="sub">📞 {hospital.phone}</p>

              <button
                className="reserve-btn"
                onClick={() => setOpenReservation(true)}
              >
                예약하기
              </button>
            </div>
          </div>

          {/* 진료 시간 */}
          <section>
            <h3>진료 시간</h3>
            <div className="hours-row">
              {hours.map((h, i) => (
                <div key={i} className="hour-card">
                  <strong>{h.day}</strong>
                  <div>
                    {h.openTime} ~ {h.closeTime}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 탭 */}
          <div className="tab-row">
            <button
              className={tab === "news" ? "tab active" : "tab"}
              onClick={() => setTab("news")}
            >
              병원소식
            </button>
            <button
              className={tab === "doctors" ? "tab active" : "tab"}
              onClick={() => setTab("doctors")}
            >
              의료진
            </button>
            <button
              className={tab === "reviews" ? "tab active" : "tab"}
              onClick={() => {
                setTab("reviews");
                loadReviews();
              }}
            >
              리뷰
            </button>
          </div>

          {/* 탭 내용 */}
          <section>
            {tab === "news" &&
              news.map((n) => (
                <div key={n.newsId} className="news-card">
                  <h4>{n.title}</h4>
                  <p>{n.content}</p>
                  <small>{n.createdAt}</small>
                </div>
              ))}

            {tab === "doctors" && <div>의료진 연동 예정</div>}

            {tab === "reviews" && (
              <>
                {/* 리뷰 작성 */}
                <div className="review-card">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      onClick={() => setRating(n)}
                      style={{
                        cursor: "pointer",
                        color: n <= rating ? "#f5b301" : "#ddd",
                        fontSize: 20,
                      }}
                    >
                      ★
                    </span>
                  ))}

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="리뷰를 작성해주세요"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImageFile(e.target.files?.[0] ?? null)
                    }
                  />

                  <button onClick={submitReview}>리뷰 등록</button>
                </div>

                {reviews.map((r) => (
                  <div key={r.reviewId} className="review-card">
                    <strong>{r.writerNickname}</strong>
                    <span>⭐ {r.rating}</span>
                    <p>{r.content}</p>
                    <small>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                ))}
              </>
            )}
          </section>
        </div>
      </div>

      {openReservation && (
        <ReservationModal
          hospitalId={hospitalId}
          onClose={() => setOpenReservation(false)}
        />
      )}
    </>
  );
}
