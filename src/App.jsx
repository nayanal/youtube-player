
import { useState } from "react";
import "./App.css";

function extractVideoId(url) {
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [videoId, setVideoId]   = useState("");
  const [error, setError]       = useState("");

  const handlePlay = () => {
    setError("");
    const id = extractVideoId(inputUrl);
    if (!id) {
      setError("Invalid YouTube URL — paste a youtube.com or youtu.be link.");
      return;
    }
    setVideoId(id);
  };

  const handleReset = () => {
    setVideoId("");
    setInputUrl("");
    setError("");
  };

  return (
    <div className="app">
      <header>
        <h1>📺 YouTube Player</h1>
        <p className="subtitle">Paste any YouTube URL to play it here</p>
      </header>

      <div className="url-box">
        <input
          className="url-input"
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          value={inputUrl}
          onChange={e => setInputUrl(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handlePlay()}
        />
        <button className="btn primary" onClick={handlePlay} disabled={!inputUrl.trim()}>
          ▶ Play
        </button>
      </div>

      {error && <div className="error-box">⚠️ {error}</div>}

      {videoId && (
        <div className="player-section">
          {/* This is exactly what SafeShare does — a YouTube embed iframe */}
          <div className="player-wrap">
            <iframe
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
          <button className="btn danger" onClick={handleReset} style={{ marginTop: "16px" }}>
            🔄 Play Another
          </button>
        </div>
      )}
    </div>
  );
}