import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IsLoginProvider } from './contexts/IsLoginContext';
import MainPage from './pages/MainPage';
import Dictaphone from './pages/VoiceRegTest';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import AddChildPage from './pages/parents/AddChildPage';
import ResultPage from './pages/parents/ResultPage';
import ChildMainPage from './pages/child/ChildMainPage';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<AddChildPage />} />
        // 임시
        <Route path="/test" element={<Dictaphone />} />
        <Route path="/parent" element={<ResultPage />} />
        <Route path="/child" element={<ChildMainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

// container로 css 적용 (TODO: Media Query -> 폰으로 볼 때는 꽉채우게)
const App = () => {
  return (
    <div className="container">
      <Routing />
    </div>
  );
};

// Ensure 'root' element is not null
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <IsLoginProvider>
        <App />
      </IsLoginProvider>
    </React.StrictMode>,
    rootElement,
  );
} else {
  console.error('Failed to find the root element.');
}
