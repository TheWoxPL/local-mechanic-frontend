import { LoginForm } from 'src/components/LoginForm/LoginForm';
import styles from './loginPage.module.scss';
import { UserAuth } from 'src/context';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const LoginPage = () => {
  const { user, loading } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};
