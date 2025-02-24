import styles from './TopBar.module.scss';
import NotificationBellSVG from 'src/assets/svgs/notification-bell.svg';

export const TopBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.location}>
          <span className={styles.title}>Location</span>
          <div className={styles.input}>choose</div>
        </div>
        <img src={NotificationBellSVG} alt="" />
      </div>
      <div className={styles.bottom}></div>
    </div>
  );
};
