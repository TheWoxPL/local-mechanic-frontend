import { NavigatorBar, OneOfferDetails } from 'src/components';
import styles from './offerDetailsPage.module.scss';

export const OfferDetailsPage = () => {
  return (
    <div className={styles.container}>
      <OneOfferDetails />
      <NavigatorBar indicatorIndex={null} />
    </div>
  );
};
