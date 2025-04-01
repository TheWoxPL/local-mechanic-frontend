import { YourCompanyTopInfo } from 'src/components/YourCompanyTopInfo/YourCompanyTopInfo';
import styles from './yourCompanyPage.module.scss';
import { YourOffers } from 'src/components/YourOffers/YourOffers';
import { useParams } from 'react-router';

export const YourCompanyPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  return (
    <div className={styles.container}>
      <YourCompanyTopInfo />
      <YourOffers companyId={companyId} />
    </div>
  );
};
