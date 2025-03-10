import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { createRoot } from 'react-dom/client';
import { App } from './App';
{
  /* TODO: delete line below before merge, to tests only */
}
import LoginViewDev from "./pages/loginPageDev/loginPageDev";
import { LoginPage } from './pages/loginPage/loginPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* TODO: delete line below before merge, to tests only */}
          <Route path="/home" element={<LoginViewDev />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>
);
