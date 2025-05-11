import { CompanyOnProfile } from '../CompanyOnProfile/CompanyOnProfile';
import styles from './AllCompaniesOnProfile.module.scss';
import AvatarMechanicSVG from 'src/assets/svgs/avatar-mechanic.svg';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import ApiUtils from 'src/shared/api/apiUtils';
import { CompanyDTO } from 'src/shared/dtos';

export const AllCompaniesOnProfile = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<CompanyDTO[]>(undefined);

  useEffect(() => {
    console.log('asd');
    const fetchData = async () => {
      ApiUtils.companies.getUserCompanies().then((response) => {
        setCompanies(response);
      });
    };
    fetchData();
  }, []);

  if (!companies) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.companies}>
        {companies.map((company) => (
          <CompanyOnProfile
            key={company.id}
            avatar={{ src: AvatarMechanicSVG, alt: 'Mechanic avatar' }}
            companyName={company.companyName}
            address={'Address'}
            uuid={company.id}
          />
        ))}
      </div>
      <button
        className={styles.addCompanyButton}
        onClick={() => navigate('/register-company')}
      >
        Add another
      </button>
    </div>
  );
};
