import { YourCompanyTopInfo } from 'src/components/YourCompanyTopInfo/YourCompanyTopInfo';
import styles from './yourCompanyPage.module.scss';
import { YourOffers } from 'src/components/YourOffers/YourOffers';

export const YourCompanyPage = () => {
  return (
    <div className={styles.container}>
      <YourCompanyTopInfo />
      <YourOffers />
    </div>
  );
};
