import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LoginPage } from './pages/loginPage/loginPage';
import { HomePage } from './pages/homePage/homePage';
{
  /* TODO: delete line below before merge, to tests only */
}
import LoginViewDev from './pages/loginPageDev/loginPageDev';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* TODO: delete line below before merge, to tests only */}
        <Route path="/dev" element={<LoginViewDev />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
