import { Link } from 'react-router';
import styles from './LoginForm.module.scss';
import GoogleLogoSVG from 'src/assets/svgs/google-logo.svg';

export const LoginForm = () => {
  return (
    <div className={styles.container}>
      <form>
        <label htmlFor="email"></label>
        <input type="email" id="email" className={styles.email} placeholder="email" />
        <label htmlFor="password"></label>
        <input type="password" id="password" className={styles.password} placeholder="password" />
        <input type="submit" className={styles.loginButton} value="Login"/>
      </form>
      <span className={styles.orContinueWithText}> Or continue with</span>
      <button className={styles.googleButton}>
        <img src={GoogleLogoSVG} alt="Google logo" />
        Google</button>
      <span className={styles.createAccountText}>Don't have account? 
        <Link to="/" className={styles.createAccountLink}> Create now</Link>
      </span>
    </div>
  );
};
