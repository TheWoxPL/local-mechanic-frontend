import { StrictMode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { createRoot } from 'react-dom/client';
import { LoginPage } from './pages/loginPage/loginPage';
import { HomePage } from './pages/homePage/homePage';
import { ProfilePage } from './pages/profilePage/profilePage';
{
  /* TODO: delete line below before merge, to tests only */
}
import LoginViewDev from './pages/loginPageDev/loginPageDev';
import { FavoritePage } from './pages/favoritePage/favoritePage';
import { OrdersPage } from './pages/ordersPage/ordersPage';
import { RegisterCompanyPage } from './pages/registerCompanyPage/registerCompanyPage';
import { YourCompanyPage } from './pages/yourCompanyPage/yourCompanyPage';
import { AuthContextProvider } from './context';
import { ProtectedRoute } from './components/ProtectedRoute';
import { OfferDetailsPage } from './pages/offerDetailsPage/offerDetailsPage';
import RegisterPage from './pages/registerPage/RegisterPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/register-company" element={<RegisterCompanyPage />} />
            <Route
              path="/your-company/:companyId"
              element={<YourCompanyPage />}
            />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/offer-details/:serviceId"
              element={<OfferDetailsPage />}
            />
          </Route>

          {/* TODO: delete line below before merge, to tests only */}
          <Route path="/dev" element={<LoginViewDev />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);
