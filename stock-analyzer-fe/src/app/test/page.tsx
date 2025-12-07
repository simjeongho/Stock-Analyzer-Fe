// app/page.tsx

"use client"; // React Hooks (useState, useEffect)를 사용하기 위해 클라이언트 컴포넌트로 선언

import { useState, useEffect } from "react";
import axios from "axios"; // Axios 임포트

export default function TestPage() {
  // 상태 관리: API 응답 메시지와 통신 상태
  const [message, setMessage] = useState("백엔드 API 연결 시도 중......");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    // 1. Axios를 사용하여 API 호출
    // '/api/v1/health' 경로는 next.config.js의 프록시 설정에 의해
    // 'http://localhost:8080/api/v1/health'로 전달됩니다.
    axios
      .get("/api/v1/health")
      .then((response) => {
        // 2. 응답 성공 시 (HTTP 2xx)
        setMessage(response.data); // Spring Boot에서 보낸 "Spring Boot API Server is Running!" 메시지
        setStatus("Success");
      })
      .catch((error) => {
        // 3. 응답 실패 시 (Error Handling)
        if (error.response) {
          // 서버는 응답했으나 4xx 또는 5xx 오류인 경우
          setMessage(`API 호출 실패: HTTP Status ${error.response.status}`);
        } else if (error.request) {
          // 서버에 요청은 보냈으나 응답을 받지 못한 경우 (서버 다운, 네트워크 문제 등)
          setMessage("API 서버에 연결할 수 없습니다. (Spring Boot 확인 요망)");
        } else {
          // 기타 오류
          setMessage(`오류 발생: ${error.message}`);
        }
        setStatus("Failed");
      });
  }, []);

  // Tailwind CSS를 이용한 시각적 스타일링
  const statusColor = status === "Success" ? "text-green-600" : "text-red-600";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        📰 주가 영향 분석기 프론트엔드
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Spring Boot API 통신 테스트
        </h2>

        <p className="text-sm font-medium text-gray-500">통신 상태:</p>
        <p className={`text-2xl font-bold ${statusColor} mb-6`}>{status}</p>

        <p className="text-sm font-medium text-gray-500">백엔드 메시지:</p>
        <p className="text-lg font-mono text-gray-900 border-t pt-2 mt-2">
          {message}
        </p>
      </div>
    </div>
  );
}
