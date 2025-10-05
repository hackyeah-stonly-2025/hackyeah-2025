import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { ToastProvider } from './util/useToast';
import Calibration from './pages/Calibration';
import AppWrapper from './pages/AppWrapper';
import Settings from './pages/Settings';
import Events from './pages/Events';
import Breaks from './pages/Breaks';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<AppWrapper />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
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
