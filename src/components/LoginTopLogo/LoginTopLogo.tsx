import styles from './LoginTopLogo.module.scss';
import LogoLoginSVG from 'src/assets/svgs/logo-login.svg';

export const LoginTopLogo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <div className={styles.front}>
          <img src={LogoLoginSVG} alt="Logo" />
        </div>
      </div>
    </div>
  );
};
