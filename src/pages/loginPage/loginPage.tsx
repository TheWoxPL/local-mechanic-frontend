import { LoginForm } from 'src/components/LoginForm/LoginForm';
import styles from './loginPage.module.scss';

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};
