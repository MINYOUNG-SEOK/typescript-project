import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './common/components/LoadingSpinner';
const AppLayout = React.lazy(() => import('./layout/AppLayout'))
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"))
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"))
const SearchResultPage = React.lazy(() => import("./pages/SearchResultPage/SearchResultPage"))
const PlaylistPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistPage"))
const PlaylistDetailPage = React.lazy(() => import("./pages/PlaylistDetailPage/PlaylistDetailPage"))


function App() {
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
      </Routes>
    </Suspense>
  );
}

export default App;