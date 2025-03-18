import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { createRoot } from 'react-dom/client';
import { LoginPage } from './pages/loginPage/loginPage';
import { HomePage } from './pages/homePage/homePage';
import { ProfilePage } from './pages/profilePage/profilePage';
import { FavouritePage } from './pages/favouritePage/favouritePage';
import { OrdersPage } from './pages/ordersPage/ordersPage';
import { RegisterCompanyPage } from './pages/registerCompanyPage/registerCompanyPage';
import ProtectedRoute from './components/ProtectedRoute';
import { RoleType } from './shared/enums';
{
  /* TODO: delete line below before merge, to tests only */
}
import LoginViewDev from './pages/loginPageDev/loginPageDev';

export const router = [
  {
    path: '/',
    element: (
      <ProtectedRoute
        allowedRoles={[
          RoleType.ADMIN,
          RoleType.ENTREPRENEUR,
          RoleType.CUSTOMER,
        ]}
      >
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute
        allowedRoles={[
          RoleType.ADMIN,
          RoleType.ENTREPRENEUR,
          RoleType.CUSTOMER,
        ]}
      >
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/favourite',
    element: (
      <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
        <FavouritePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/orders',
    element: (
      <ProtectedRoute
        allowedRoles={[
          RoleType.ADMIN,
          RoleType.ENTREPRENEUR,
          RoleType.CUSTOMER,
        ]}
      >
        <OrdersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute
        allowedRoles={[
          RoleType.ADMIN,
          RoleType.ENTREPRENEUR,
          RoleType.CUSTOMER,
        ]}
      >
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register-company',
    element: (
      <ProtectedRoute
        allowedRoles={[
          RoleType.ADMIN,
          RoleType.ENTREPRENEUR,
          RoleType.CUSTOMER,
        ]}
      >
        <RegisterCompanyPage />
      </ProtectedRoute>
    ),
  },
  // TODO: delete line below before merge, for tests only
  {
    path: '/dev',
    element: <LoginViewDev />,
  },
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {router.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
