import { useEffect, useState } from 'react';
import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './yourCompaniesPage.module.scss';
import Spinner from 'src/components/Spinner/Spinner';
import { AllCompaniesOnProfile } from 'src/components/AllCompaniesOnProfile/AllCompaniesOnProfile';
import { useNavigate } from 'react-router';
import { UserAuth } from 'src/context';
import { RoleType } from 'src/shared/enums/role-type.enum';

export const YourCompaniesPage = () => {
  const [loading, setLoading] = useState(true);
  const { roles } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roles?.includes(RoleType.ENTREPRENEUR)) {
      navigate('/favorite');
    } else {
      setLoading(false);
    }
  }, [roles, navigate]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner />
        <NavigatorBar indicatorIndex={1} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My companies</h1>
      </div>
      <AllCompaniesOnProfile />
      <NavigatorBar indicatorIndex={1} />
    </div>
  );
};
