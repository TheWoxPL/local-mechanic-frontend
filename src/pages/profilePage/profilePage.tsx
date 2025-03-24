import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './profilePage.module.scss';
import { LoginForm } from 'src/components/LoginForm/LoginForm';
import { LoginTopLogo } from 'src/components/LoginTopLogo/LoginTopLogo';
import { MechanicInfo } from 'src/components/MechanicInfo/MechanicInfo';
import { ProfileInfo } from 'src/components/ProfileInfo/ProfileInfo';
import { AllCompaniesOnProfile } from 'src/components/AllCompaniesOnProfile/AllCompaniesOnProfile';
import { UserAuth } from 'src/context';

export const ProfilePage = () => {
  const { user, loading, logout } = UserAuth();

  if (loading) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      {!user ? (
        <>
          <LoginTopLogo />
          <LoginForm />
        </>
      ) : (
        <>
          <ProfileInfo currentUser={user} />
          <MechanicInfo />
          <AllCompaniesOnProfile />
          <button className={styles.logoutButton} onClick={logout}>
            Logout
          </button>
        </>
      )}
      <NavigatorBar indicatorIndex={3} />
    </div>
  );
};
