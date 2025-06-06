import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './common/components/LoadingSpinner';
import useExchangeToken from './hooks/useExchangeToken';
import CallbackPage from './pages/CallbackPage/CallbackPage';
const AppLayout = React.lazy(() => import('./layout/AppLayout'))
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"))
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"))
const SearchResultPage = React.lazy(() => import("./pages/SearchResultPage/SearchResultPage"))
const PlaylistPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistPage"))
const PlaylistDetailPage = React.lazy(() => import("./pages/PlaylistDetailPage/PlaylistDetailPage"))


function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');
  const { mutate: exchangeToken } = useExchangeToken()

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

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