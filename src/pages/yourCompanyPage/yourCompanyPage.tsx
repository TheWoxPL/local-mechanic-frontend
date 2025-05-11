import { YourCompanyTopInfo } from 'src/components/YourCompanyTopInfo/YourCompanyTopInfo';
import styles from './yourCompanyPage.module.scss';
import { YourOffers } from 'src/components/YourOffers/YourOffers';
import { useParams } from 'react-router';
import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';

export const YourCompanyPage = () => {
  const { companyId } = useParams<{ companyId: string }>();

  if (!companyId) {
    return <div>Company not found</div>;
  }

  return (
    <div className={styles.container}>
      <YourCompanyTopInfo companyId={companyId} />
      <YourOffers companyId={companyId} />
      <NavigatorBar indicatorIndex={3} />
    </div>
  );
};
