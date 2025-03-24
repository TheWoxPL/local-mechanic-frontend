import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './profilePage.module.scss';
import { LoginForm } from 'src/components/LoginForm/LoginForm';
import { LoginTopLogo } from 'src/components/LoginTopLogo/LoginTopLogo';
import { UserAuth } from 'src/context';
import { ProfileLogged } from 'src/components/ProfileLogged/ProfileLogged';

export const ProfilePage = () => {
  const { user, loading } = UserAuth();

  if (loading) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      {user ? (
        <ProfileLogged />
      ) : (
        <>
          <LoginTopLogo />
          <LoginForm />
        </>
      )}
      <NavigatorBar indicatorIndex={3} />
    </div>
  );
};
