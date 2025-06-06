import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useExchangeToken from '../../hooks/useExchangeToken';

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
      navigate('/');
    }
  }, [location, exchangeToken, navigate]);

  return <div>로그인 처리 중</div>;
};

export default CallbackPage; 