import { Routes, Route, Navigate } from "react-router-dom";
import VideoPage from "./pages/VideoPage";
import Video2 from "./pages/Video2";
import MemoryBook from "./pages/MemoryBook";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import LoveLetter from "./pages/LoveLetter";
import FinalSurprise from "./pages/FinalSurprise";
import { checkBirthdayUnlocked } from "./components/Countdown";

function ProtectedRoute({ children }) {
  const isUnlocked = checkBirthdayUnlocked();
  if (!isUnlocked) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />
      <Route
        path="/love-letter"
        element={
          <ProtectedRoute>
            <LoveLetter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/memory"
        element={
          <ProtectedRoute>
            <MemoryBook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/video"
        element={
          <ProtectedRoute>
            <VideoPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/video2"
        element={
          <ProtectedRoute>
            <Video2 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/final"
        element={
          <ProtectedRoute>
            <FinalSurprise />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown pages */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;