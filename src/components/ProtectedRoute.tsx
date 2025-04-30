import { Outlet } from 'react-router';
import { UserAuth } from 'src/context/AuthContext';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Spinner from './Spinner/Spinner';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user, loading } = UserAuth();

  useEffect(() => {
    if (!loading && user === null) {
      navigate('/profile');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return <Outlet />;
};
