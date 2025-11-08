import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchPage } from "./components/pages/SearchPage";
import AnimeDetailPage from "./components/pages/AnimeDetail";

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/anime/:id" element={<AnimeDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}