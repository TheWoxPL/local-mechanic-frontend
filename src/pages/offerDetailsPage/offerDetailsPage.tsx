import { NavigatorBar, OneOfferDetails } from 'src/components';
import styles from './offerDetailsPage.module.scss';
import { useParams } from 'react-router';

export const OfferDetailsPage = () => {
  const { offerId } = useParams<{ offerId: string }>();
  return (
    <div className={styles.container}>
      <OneOfferDetails offerId={offerId} />
      <NavigatorBar indicatorIndex={null} />
    </div>
  );
};
