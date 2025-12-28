import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { login } from "../../api/auth";

/* 전화번호 자동 하이픈 */
const formatPhoneNumber = (value: string) => {
  const numbersOnly = value.replace(/\D/g, "");
  if (numbersOnly.length <= 3) return numbersOnly;
  if (numbersOnly.length <= 7)
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
  return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* 로그인 버튼 활성 조건 */
  const canLogin =
    /^010-\d{4}-\d{4}$/.test(phone) &&
    password.trim() !== "" &&
    !loading;

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await login(phone, password);

      // ✅ 핵심 수정 부분
      const token = res.data?.result?.accessToken;

      if (!token) {
        console.error("로그인 응답:", res.data);
        throw new Error("로그인 응답에 accessToken이 없습니다.");
      }

      localStorage.setItem("accessToken", token);

      // 🔍 디버그용 (확인 후 지워도 됨)
      console.log("저장된 accessToken:", localStorage.getItem("accessToken"));

      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert("전화번호 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-wrapper">
        {/* 헤더 */}
        <header className="top-header">
          🐾 With Tail&nbsp;&nbsp;반려동물과 함께하는 모든 순간
        </header>

        <div className="login-content">
          <h1 className="title">로그인</h1>
          <p className="subtitle">계정에 로그인하세요</p>

          {/* 전화번호 */}
          <label className="label">전화번호</label>
          <input
            className="input"
            placeholder="010-0000-0000"
            value={phone}
            maxLength={13}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            disabled={loading}
          />

          {/* 비밀번호 */}
          <label className="label">비밀번호</label>
          <input
            className="input"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          {/* 로그인 버튼 */}
          <button
            className={`login-btn ${canLogin ? "active" : ""}`}
            disabled={!canLogin}
            onClick={handleLogin}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>

          {/* 회원가입 */}
          <div className="signup-row">
            <span className="signup-text">계정이 없으신가요?</span>
            <button
              className="signup-link"
              onClick={() => navigate("/signup/terms")}
              disabled={loading}
            >
              회원가입
            </button>
          </div>

          {/* 구분선 */}
          <div className="divider">
            <span>또는</span>
          </div>

          {/* 구글 로그인 */}
          <button className="google-btn" disabled>
            G 구글 계정으로 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
