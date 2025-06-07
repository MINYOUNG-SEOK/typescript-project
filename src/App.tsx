import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from './common/components/LoadingSpinner';
import CallbackPage from './pages/CallbackPage/CallbackPage';
import useExchangeToken from './hooks/useExchangeToken';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchResultPage = React.lazy(() => import("./pages/SearchResultPage/SearchResultPage"));
const PlaylistPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistPage"));
const PlaylistDetailPage = React.lazy(() => import("./pages/PlaylistDetailPage/PlaylistDetailPage"));

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get('code');
  const verifier = localStorage.getItem('code_verifier');

  const { mutate: exchangeToken } = useExchangeToken({
    onSuccess: () => { navigate('/'); },
    onError: (err) => { alert('로그인 실패: ' + err.message); }
  });

  useEffect(() => {
    if (code && verifier) {
      console.log('exchangeToken은', { code, verifier });
      exchangeToken({ code, codeVerifier: verifier });
    }
  }, [code, verifier, exchangeToken]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchResultPage />} />
          <Route path="playlist" element={<PlaylistPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
        </Route>
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;