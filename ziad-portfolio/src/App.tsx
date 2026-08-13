import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WelcomeScreen } from './components/WelcomeScreen';
import HomePage from './pages/HomePage';
import AdminGate from './pages/AdminGate';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  return (
    <BrowserRouter>
      {isWelcomeVisible && <WelcomeScreen onLoadingComplete={() => setIsWelcomeVisible(false)} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminGate />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
