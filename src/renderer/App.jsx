import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { ToastProvider } from './util/useToast';
import Calibration from './pages/Calibration';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calibration" element={<Calibration />} />
        </Routes>
      </ToastProvider>
    </Router>
  );
}
