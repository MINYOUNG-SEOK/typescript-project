// src/hooks/useExchangeToken.ts
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";

const useExchangeToken = (
  options?: UseMutationOptions<
    ExchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >
) => {
  return useMutation<ExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
    // 1) 먼저 사용자 옵션 반영
    ...options,

    // 2) 실제 토큰 교환 함수
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),

    // 3) 기본 성공/실패 핸들러
    onSuccess: (data, variables, context) => {
      // access_token 저장
      localStorage.setItem('access_token', data.access_token);
      // PKCE code_verifier 제거
      localStorage.removeItem('code_verifier');
      // 사용자가 넘긴 추가 onSuccess 호출
      options?.onSuccess?.(data, variables, context);
    },
    onError: (err, variables, context) => {
      console.error("토큰 교환 실패:", err);
      options?.onError?.(err, variables, context);
    }
  });
};

export default useExchangeToken;