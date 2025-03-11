import styles from './MechanicInfo.module.scss';
import AvatarMechanicSVG from 'src/assets/svgs/avatar-mechanic.svg';

export const MechanicInfo = () => {
  return (
    <div className={styles.container}>
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
  );
};
