import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { ToastProvider } from './util/useToast';
import Calibration from './pages/Calibration';
import AppWrapper from './pages/AppWrapper';
import Settings from './pages/Settings';
import Events from './pages/Events';
import Breaks from './pages/Breaks';
import Exercise from './pages/break/Exercise';
import Breathing from './pages/break/Breathing';
import Water from './pages/break/Water';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<AppWrapper />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/breathing" element={<Breathing />} />
            <Route path="/water" element={<Water />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="events" element={<Events />} />
              <Route path="breaks" element={<Breaks />} />
              <Route path="calibration" element={<Calibration />} />
            </Route>
          </Route>
        </Routes>
      </ToastProvider>
    </Router>
  );
}
