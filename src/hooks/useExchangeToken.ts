// src/hooks/useExchangeToken.ts
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";

const useExchangeToken = (
  options?: UseMutationOptions<ExchangeTokenResponse, Error, { code: string; codeVerifier: string }>
) => {
  const queryClient = useQueryClient();

  return useMutation<ExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
    ...options,

    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),

    onSuccess: (data, variables, context) => {
      // 1) access_token 저장
      localStorage.setItem("access_token", data.access_token);
      // 2) code_verifier 삭제
      localStorage.removeItem("code_verifier");
      // 3) 프로필 쿼리 무효화 → 바로 refetch
      queryClient.invalidateQueries({ queryKey: ["current-user-profile"] });
      // 4) 추가 onSuccess 호출
      options?.onSuccess?.(data, variables, context);
    },

    onError: (err, variables, context) => {
      console.error("토큰 교환 실패:", err);
      options?.onError?.(err, variables, context);
    },
  });
};

export default useExchangeToken;