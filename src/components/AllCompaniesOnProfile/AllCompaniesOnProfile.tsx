import { CompanyOnProfile } from '../CompanyOnProfile/CompanyOnProfile';
import styles from './AllCompaniesOnProfile.module.scss';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import ApiUtils from 'src/shared/api/apiUtils';
import { CompanyDTO } from 'src/shared/dtos';

export const AllCompaniesOnProfile = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<CompanyDTO[]>(undefined);

  useEffect(() => {
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
            companyName={company.companyName}
            address={'Address'}
            uuid={company.id}
            imageUrl={company.imageUrl}
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
