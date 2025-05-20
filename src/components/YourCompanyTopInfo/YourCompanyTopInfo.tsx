import { UserAuth } from 'src/context';
import styles from './YourCompanyTopInfo.module.scss';
import AvatarSVG from 'src/assets/svgs/avatar-mechanic.svg';
import { useEffect, useState } from 'react';
import ApiUtils from 'src/shared/api/apiUtils';
import { CompanyDTO } from 'src/shared/dtos';

interface YourCompanyTopInfoProps {
  companyId: string;
}

export const YourCompanyTopInfo = ({ companyId }: YourCompanyTopInfoProps) => {
  const { loading } = UserAuth();
  const [companyData, setCompanyData] = useState<CompanyDTO>();
  const [isFetching, setIsFetching] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiUtils.companies.getCompanyById(companyId);
        setCompanyData(data);
        if (data.imageUrl) {
          setImagePreview(data.imageUrl);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [companyId, loading]);

  if (loading || isFetching) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <img
            src={imagePreview || AvatarSVG}
            alt="Company avatar"
            className={styles.avatarImage}
          />
        </div>
        <div className={styles.infoDetails}>
          <span className={styles.companyName}>{companyData.companyName}</span>
          <span>{companyData.address || 'Address not available'}</span>
          <span>
            Found date:
            {' ' + new Date(companyData.foundDate).toLocaleDateString('de-DE')}
          </span>
          <span>{companyData.phoneNumber}</span>
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
