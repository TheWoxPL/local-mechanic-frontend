import { CompanyOnProfile } from '../CompanyOnProfile/CompanyOnProfile';
import styles from './AllCompaniesOnProfile.module.scss';
import AvatarMechanicSVG from 'src/assets/svgs/avatar-mechanic.svg';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import ApiUtils from 'src/shared/api/apiUtils';
import { CompanyDTO } from 'src/shared/dtos';

export const AllCompaniesOnProfile = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<CompanyDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      ApiUtils.companies.getUserCompanies().then((response) => {
        // console.log(response)
        setCompanies(response);
      });
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.companies}>
        {companies.map((company) => (
          <CompanyOnProfile
            key={company.companyName}
            avatar={{ src: AvatarMechanicSVG, alt: 'Mechanic avatar' }}
            companyName={company.companyName}
            address={'Address'}
            uuid={company.id}
          />
        ))}
      </div>
      {/* <CompanyOnProfile
        avatar={{ src: AvatarMechanicSVG, alt: 'Mechanic avatar' }}
        companyName={'Mock company'}
        address={'Dluga 16a, cracow'}
        companyId={'1'}
      /> */}
      <button
        className={styles.addCompanyButton}
        onClick={() => navigate('/register-company')}
      >
        Add another
      </button>
    </div>
  );
};
