import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './favoritePage.module.scss';
import { UserAuth } from 'src/context';
import { useEffect, useState } from 'react';
import { ServiceDTO } from 'src/shared/dtos';
import ApiUtils from 'src/shared/api/apiUtils';
import { Offer } from 'src/components/Offer/Offer';

export const FavoritePage = () => {
  const { loading } = UserAuth();
  const [services, setServices] = useState<ServiceDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: ServiceDTO[] =
          await ApiUtils.services.getFavoritesForUser();
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
      <div className={styles.topInfo}>
        <span>
          Favorite services: <span>{services.length}</span>
        </span>
      </div>
      <div className={styles.offers}>
        {services.map((offer) => {
          return <Offer key={offer.id} {...offer} />;
        })}
      </div>
      <NavigatorBar indicatorIndex={1} />
    </div>
  );
};
