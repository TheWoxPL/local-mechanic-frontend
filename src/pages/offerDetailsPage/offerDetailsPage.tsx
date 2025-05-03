import { NavigatorBar, OneOfferDetails } from 'src/components';
import styles from './offerDetailsPage.module.scss';
import { useParams } from 'react-router';

export const OfferDetailsPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  return (
    <div className={styles.container}>
      <OneOfferDetails serviceId={serviceId} />
      <NavigatorBar indicatorIndex={null} />
    </div>
  );
};
