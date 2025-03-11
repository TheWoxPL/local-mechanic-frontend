import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './profilePage.module.scss';
import { LoginForm } from 'src/components/LoginForm/LoginForm';
import { LoginTopLogo } from 'src/components/LoginTopLogo/LoginTopLogo';

// import { MechanicInfo } from 'src/components/MechanicInfo/MechanicInfo';
// import { ProfileInfo } from 'src/components/ProfileInfo/ProfileInfo';

export const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <LoginTopLogo />
      <LoginForm />

      {/* <ProfileInfo />
      <MechanicInfo /> */}

      {/* <button className={styles.logoutButton}>Logout</button> */}

      <NavigatorBar indicatorIndex={3} />
    </div>
  );
};
