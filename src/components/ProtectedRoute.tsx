import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { UserAuth } from 'src/context/AuthContext';
import { useNavigate } from 'react-router';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [navigate, user]);

  return <Outlet />;
};
