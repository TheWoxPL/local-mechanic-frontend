import { NavigatorBar, OneOfferDetails } from 'src/components';
import styles from './offerDetailsPage.module.scss';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { AvailableSlot } from 'src/types/AvailableSlot';
import ApiUtils from 'src/shared/api/apiUtils';

export const OfferDetailsPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (serviceId) {
      setIsLoading(true);
      ApiUtils.services
        .getAvailableSlots(serviceId)
        .then((response) => {
          setAvailableSlots(response);
        })
        .catch((error) => {
          console.error('Error fetching available slots:', error);
          setAvailableSlots([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [serviceId]);

  return (
    <div className={styles.container}>
      <OneOfferDetails
        serviceId={serviceId}
        availableSlots={availableSlots}
        isLoading={isLoading}
      />
      <NavigatorBar indicatorIndex={null} />
    </div>
  );
};
