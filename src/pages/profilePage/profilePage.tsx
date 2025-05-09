import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './profilePage.module.scss';
import { LoginForm } from 'src/components/LoginForm/LoginForm';
import { LoginTopLogo } from 'src/components/LoginTopLogo/LoginTopLogo';
import { UserAuth } from 'src/context';
import { ProfileLogged } from 'src/components/ProfileLogged/ProfileLogged';
import RegisterForm from 'src/components/RegisterForm/RegisterForm';
import { useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';

export const ProfilePage = () => {
  const { user, loading } = UserAuth();
  const [searchParams] = useSearchParams();
  const [activeForm, setActiveForm] = useState('login');

  useEffect(() => {
    const formParam = searchParams.get('form');
    if (formParam === 'register') {
      setActiveForm('register');
    } else {
      setActiveForm('login');
    }
  }, [searchParams]);

  const switchForm = (formName) => {
    setActiveForm(formName);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {user ? (
        <ProfileLogged />
      ) : (
        <>
          <LoginTopLogo />
          {activeForm === 'register' ? (
            <RegisterForm onSwitchToLogin={() => switchForm('login')} />
          ) : (
            <LoginForm onSwitchToRegister={() => switchForm('register')} />
          )}
        </>
      )}
      <NavigatorBar indicatorIndex={3} />
    </div>
  );
};
