import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Home from './pages/Home';
import { ToastProvider } from './util/useToast';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ToastProvider>
    </Router>
  );
}
