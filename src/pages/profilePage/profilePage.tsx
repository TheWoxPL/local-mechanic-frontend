import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './profilePage.module.scss';
// import { LoginForm } from 'src/components/LoginForm/LoginForm';
// import { LoginTopLogo } from 'src/components/LoginTopLogo/LoginTopLogo';
import AvatarSVG from 'src/assets/svgs/avatar.svg';
import AvatarMechanicSVG from 'src/assets/svgs/avatar-mechanic.svg';

export const ProfilePage = () => {
  return (
    <div className={styles.container}>
      {/* <LoginTopLogo />
      <LoginForm /> */}

      <div className={styles.profileInfo}>
        <div className={styles.avatar}>
          <img src={AvatarSVG} alt="User avatar" />
        </div>
        <div className={styles.info}>
          <span className={styles.hello}>Hello John!</span>
          <span className={styles.date}>since: 12 nov 2019</span>
          <button className={styles.editDataButton}>Edit data</button>
        </div>
      </div>

      <div className={styles.mechanicInfo}>
        <div className={styles.mechanicAvatar}>
          <img src={AvatarMechanicSVG} alt="Mechanic svg" />
        </div>
        <div className={styles.info}>
          <span className={styles.text}>
            Are you mechanic? Do you want make advertisement of your services?
            Click below to become an entrepreneur.
          </span>
          <button className={styles.submitButton}>Submit</button>
        </div>
      </div>
      <button className={styles.logoutButton}>Logout</button>

      <NavigatorBar indicatorIndex={3} />
    </div>
  );
};
