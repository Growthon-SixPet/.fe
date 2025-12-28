import { useNavigate } from "react-router-dom";
import "./mainpage01.css";

/* 후기 데이터 */
const reviews = [
  {
    name: "김규빈님",
    date: "2025. 11. 17",
    text:
      "강아지가 갑자기 아파서 급하게 찾아왔는데, 24시간 응급실이 있어서 정말 다행이었어요.\n의료진분들도 친절하시고 치료도 꼼꼼하게 봐주셨어요!",
    hospital: "로얄 동물메디컬센터",
  },
  {
    name: "김한민님",
    date: "2025. 11. 30",
    text:
      "강아지가 갑자기 아파서 급하게 찾아왔는데, 24시간 응급실이 있어서 정말 다행이었어요.\n의료진분들도 친절하시고 치료도 꼼꼼하게 봐주셨어요!",
    hospital: "로얄 동물메디컬센터",
  },
  {
    name: "오민석님",
    date: "2025. 12. 11",
    text:
      "강아지가 갑자기 아파서 급하게 찾아왔는데, 24시간 응급실이 있어서 정말 다행이었어요.\n의료진분들도 친절하시고 치료도 꼼꼼하게 봐주셨어요!",
    hospital: "로얄 동물메디컬센터",
  },
  {
    name: "박유미님",
    date: "2025. 11. 20",
    text:
      "강아지가 갑자기 아파서 급하게 찾아왔는데, 24시간 응급실이 있어서 정말 다행이었어요.\n의료진분들도 친절하시고 치료도 꼼꼼하게 봐주셨어요!",
    hospital: "로얄 동물메디컬센터",
  },
  {
    name: "박연지님",
    date: "2025. 10. 19",
    text:
      "강아지가 갑자기 아파서 급하게 찾아왔는데, 24시간 응급실이 있어서 정말 다행이었어요.\n의료진분들도 친절하시고 치료도 꼼꼼하게 봐주셨어요!",
    hospital: "로얄 동물메디컬센터",
  },
  {
    name: "서강호님",
    date: "2025. 09. 29",
    text:
      "강아지가 갑자기 아파서 급하게 찾아왔는데, 24시간 응급실이 있어서 정말 다행이었어요.\n의료진분들도 친절하시고 치료도 꼼꼼하게 봐주셨어요!",
    hospital: "로얄 동물메디컬센터",
  },
];

const Mainpage01 = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <main className="main">
        {/* ===== Hero ===== */}
        <section className="hero">
          <h1>
            우리 아이를 위한 <br /> 최고의 동물병원 찾기
          </h1>
          <p>
            전국 동물병원 정보와 실제 후기를 한 눈에 비교하고,
            <br />
            우리 반려동물에게 가장 적합한 병원을 찾아보세요.
          </p>

          <div className="search-box">
            <input placeholder="🔍 진료과목, 병원명 검색" />
            <input placeholder="📍 지역명 입력" />
            <button
              className="search-btn"
              onClick={() => navigate("/hospital/search")}
            >
              병원 찾기
            </button>
          </div>
        </section>

        {/* ===== Why ===== */}
        <section className="why">
          <h2>왜 withtail을 선택해야하나요?</h2>
          <div className="why-cards">
            <div className="why-card">
              <div className="icon">⭐</div>
              <h3>검증된 병원만</h3>
              <p>엄격한 심사를 통과한 신뢰할 수 있는 동물병원만 등록</p>
            </div>
            <div className="why-card">
              <div className="icon">💬</div>
              <h3>실제 후기</h3>
              <p>실제 이용자들이 남긴 진짜 후기만 제공합니다.</p>
            </div>
            <div className="why-card">
              <div className="icon">📋</div>
              <h3>전문의 정보</h3>
              <p>병원별 전문의 정보와 진료 과목을 제공합니다.</p>
            </div>
          </div>
        </section>

        {/* ===== Reviews ===== */}
        <section className="reviews">
          <h2>실제 이용자 후기</h2>
          <p className="reviews-desc">
            WithTail 을 통해 좋은 병원을 찾은 분들의 생생한 후기입니다.
          </p>

          <div className="review-grid">
            {reviews.map((r, i) => (
              <div className="review-card" key={i}>
                <div className="review-top">
                  <div className="review-user">
                    <img src="/images/Ellipse 1.png" alt="profile" />
                    <div className="user-info">
                      <strong>{r.name}</strong>
                      <span>{r.date}</span>
                    </div>
                  </div>
                  <div className="stars">★★★★★</div>
                </div>

                <div className="review-divider" />

                <p className="review-text">
                  {r.text.split("\n").map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>

                <span className="hospital">{r.hospital}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Mainpage01;
