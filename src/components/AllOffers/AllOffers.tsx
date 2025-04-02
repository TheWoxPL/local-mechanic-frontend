import { Offer } from '../Offer/Offer';
import styles from './AllOffers.module.scss';
import { UserAuth } from 'src/context';
import { useEffect, useState } from 'react';
import { ServiceDTO } from 'src/shared/dtos';
import ApiUtils from 'src/shared/api/apiUtils';

export const AllOffers = () => {
  const { loading } = UserAuth();
  const [services, setServices] = useState<ServiceDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: ServiceDTO[] =
          await ApiUtils.services.generateServicesForUser();
        setServices(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      {services.map((offer) => {
        return <Offer key={offer.id} {...offer} />;
      })}
    </div>
  );
};
