import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { ToastProvider } from './util/useToast';
import Calibration from './pages/Calibration';
import AppWrapper from './pages/AppWrapper';
import Settings from './pages/Settings';
import Events from './pages/Events';
import Breaks from './pages/Breaks';
import Notifications from './pages/Notifications';
import VideoFeed from './pages/VideoFeed';
import Loader from './components/Loader';
import Typography from './components/Typography';
import Flexbox from './components/Flexbox';

export default function App() {
  const [recognitionServerStarted, setRecognitionServerStarted] =
    useState(false);

  useEffect(() => {
    window.electron?.ipcRenderer.sendMessage('is-recognition-server-started');
    window.electron?.ipcRenderer.on('recognition-server-started', () => {
      setRecognitionServerStarted(true);
    });
  }, []);

  const pathname = window.location.search.split('?pathname=')[1];

  return (
    <Router initialEntries={[`${pathname}`]}>
      <ToastProvider>
        <Routes>
          <Route path="/calibration" element={<Calibration />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/video-feed" element={<VideoFeed />} />

          {recognitionServerStarted ? (
            <Route path="/" element={<AppWrapper />}>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<Settings />}>
                <Route path="events" element={<Events />} />
                <Route path="breaks" element={<Breaks />} />
                <Route path="calibration" element={<Calibration />} />
              </Route>
            </Route>
          ) : (
            <Route
              path="/"
              element={
                <Flexbox flexDirection="column" gap={16} alignItems="center">
                  <Typography variant="h3" marginTop={80}>
                    Initializing face recognition...
                  </Typography>
                  <Typography variant="body1" marginBottom={8}>
                    This may take a while (up to 2 minutes). Please wait.
                  </Typography>
                  <Loader />
                </Flexbox>
              }
            />
          )}
        </Routes>
      </ToastProvider>
    </Router>
  );
}
