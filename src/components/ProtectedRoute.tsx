import { Outlet } from 'react-router';
import { UserAuth } from 'src/context/AuthContext';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user, loading } = UserAuth();

  useEffect(() => {
    if (!loading && user === null) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return null;
  }

  if (user === null) {
    return null;
  }

  return <Outlet />;
};
