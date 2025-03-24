import { CompanyOnProfile } from '../CompanyOnProfile/CompanyOnProfile';
import styles from './AllCompaniesOnProfile.module.scss';
import AvatarMechanicSVG from 'src/assets/svgs/avatar-mechanic.svg';
import { useNavigate } from 'react-router';

export const AllCompaniesOnProfile = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <CompanyOnProfile
        avatar={{ src: AvatarMechanicSVG, alt: 'Mechanic avatar' }}
        companyName={'Mock company'}
        address={'Dluga 16a, cracow'}
        companyId={'1'}
      />
      <button
        className={styles.addCompanyButton}
        onClick={() => navigate('/register-company')}
      >
        Add another
      </button>
    </div>
  );
};
