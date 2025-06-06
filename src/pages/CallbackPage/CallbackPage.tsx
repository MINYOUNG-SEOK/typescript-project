import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useExchangeToken from '../../hooks/useExchangeToken';

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: exchangeToken } = useExchangeToken({
    onSuccess: () => {
      navigate('/');
    },
    onError: (err) => {
      alert('로그인 실패: ' + err.message);
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const initialCodeVerifier = localStorage.getItem('code_verifier');

    console.log('콜백 useEffect 실행', { code, codeVerifier: initialCodeVerifier });

    const existingAccessToken = localStorage.getItem('access_token');
    if (existingAccessToken) {
      console.log('이미 access_token이 존재하여 홈으로 이동합니다.');
      navigate('/');
      return;
    }

    if (code && initialCodeVerifier) {
      console.log('exchangeToken 호출', { code, codeVerifier: initialCodeVerifier });
      exchangeToken({ code, codeVerifier: initialCodeVerifier });
    } else {
      console.error("로그인에 필요한 정보가 부족합니다.", { code, codeVerifier: initialCodeVerifier });
    }
  }, [location, exchangeToken, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default CallbackPage; 