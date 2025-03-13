import styles from './ProfileInfo.module.scss';
import AvatarSVG from 'src/assets/svgs/avatar.svg';

export const ProfileInfo = ({ currentUser }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={AvatarSVG} alt="User avatar" />
      </div>
      <div className={styles.info}>
        <span className={styles.hello}>Hello {currentUser.username}!</span>
        <span className={styles.date}>since: 12 nov 2019</span>
        <button className={styles.editDataButton}>Edit data</button>
      </div>
    </div>
  );
};
