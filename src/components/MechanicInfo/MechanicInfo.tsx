import styles from './MechanicInfo.module.scss';
import AvatarMechanicSVG from 'src/assets/svgs/avatar-mechanic.svg';
import { useNavigate } from 'react-router';

export const MechanicInfo = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.mechanicAvatar}>
        <img src={AvatarMechanicSVG} alt="Mechanic svg" />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>Become an entrepreneur</span>
        <span className={styles.text}>
          Are you mechanic? Do you want make advertisement of your services?
          Click below to become an entrepreneur.
        </span>
        <button
          className={styles.submitButton}
          onClick={() => navigate('/register-company')}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
