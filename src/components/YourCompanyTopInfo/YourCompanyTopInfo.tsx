import { UserAuth } from 'src/context';
import styles from './YourCompanyTopInfo.module.scss';
import AvatarSVG from 'src/assets/svgs/avatar-mechanic.svg';
import { useEffect, useState } from 'react';
import ApiUtils from 'src/shared/api/apiUtils';
import { useParams } from 'react-router';
import { CompanyDTO } from 'src/shared/dtos';

export const YourCompanyTopInfo = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { loading } = UserAuth();
  const [companyData, setCompanyData] = useState<CompanyDTO>();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiUtils.companies.getCompanyById(uuid);
        setCompanyData(data);
      } catch (error) {
        console.error('Error fetching company data:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [uuid, loading]);

  if (loading || isFetching) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <img src={AvatarSVG} alt="Avatar" />
        </div>
        <div className={styles.infoDetails}>
          <span className={styles.companyName}>{companyData.companyName}</span>
          <span>address</span>
          <span>created at</span>
          <span>Services: 21</span>
        </div>
        <div className={styles.editSide}>
          <button>Edit</button>
        </div>
      </div>
      <div className={styles.owners}>
        <span>owners: </span>
        <div className={`${styles.oneOwner} ${styles.oneOwnerCreator}`}>Me</div>
        <div className={styles.oneOwner}>John Doe</div>
      </div>
      <div className={styles.description}>{companyData.description}</div>
    </div>
  );
};
