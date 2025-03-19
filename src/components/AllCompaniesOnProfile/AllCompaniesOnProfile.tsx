import { CompanyOnProfile } from '../CompanyOnProfile/CompanyOnProfile';
import styles from './AllCompaniesOnProfile.module.scss';
import AvatarMechanicSVG from 'src/assets/svgs/avatar-mechanic.svg';

export const AllCompaniesOnProfile = () => {
  return (
    <div className={styles.container}>
      <CompanyOnProfile
        avatar={{ src: AvatarMechanicSVG, alt: 'Mechanic avatar' }}
        companyName={'Mock company'}
        address={'Dluga 16a, cracow'}
        companyId={'1'}
      />
    </div>
  );
};
