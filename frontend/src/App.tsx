import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminData from './pages/AdminData';
import AdminQuiz from './pages/AdminQuiz';
import AdminPrompt from './pages/AdminPrompt';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import { theme } from './styles/theme';
import PrivateRoute from './components/PrivateRoute';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
  @font-face {
    font-family: 'SamsungOne';
    src: url('/fonts/SamsungOne-400.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  body {
    margin: 0;
    padding: 0;
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: ${theme.font.family};
    font-size: ${theme.font.size};
    min-height: 100vh;
    letter-spacing: -0.01em;
    -webkit-font-smoothing: antialiased;
    transition: background 0.2s;
  }
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.15s;
  }
  ::-webkit-scrollbar {
    width: 8px;
    background: #e5e8ef;
  }
  ::-webkit-scrollbar-thumb {
    background: #cfd8e3;
    border-radius: 4px;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    body {
      font-size: 15px;
    }
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/admin/data" element={<PrivateRoute adminOnly><AdminData /></PrivateRoute>} />
          <Route path="/admin/quiz" element={<PrivateRoute adminOnly><AdminQuiz /></PrivateRoute>} />
          <Route path="/admin/prompt" element={<PrivateRoute adminOnly><AdminPrompt /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 