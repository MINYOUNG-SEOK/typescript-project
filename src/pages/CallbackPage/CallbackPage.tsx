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


    if (code && initialCodeVerifier) {
      exchangeToken({ code, codeVerifier: initialCodeVerifier });
    } else {
      console.error("로그인에 필요한 정보가 부족합니다.", { code, codeVerifier: initialCodeVerifier });
      navigate('/login');
    }
  }, [location, exchangeToken, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default CallbackPage; 