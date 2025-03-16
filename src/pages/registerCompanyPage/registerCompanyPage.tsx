import styles from './registerCompanyPage.module.scss';
import { RegisterCompanyForm } from 'src/components/RegisterCompanyForm/RegisterCompanyForm';
import BackSVG from 'src/assets/svgs/back.svg';
import { useNavigate } from 'react-router';

export const RegisterCompanyPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={BackSVG} alt="go back button" onClick={() => navigate(-1)} />
        <div className={styles.text}> Register company</div>
      </div>
      <RegisterCompanyForm />
    </div>
  );
};
