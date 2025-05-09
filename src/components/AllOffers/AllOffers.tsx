import { Offer } from '../Offer/Offer';
import styles from './AllOffers.module.scss';
import { useEffect, useState } from 'react';
import { ServiceDTO } from 'src/shared/dtos';
import ApiUtils from 'src/shared/api/apiUtils';
import Spinner from '../Spinner/Spinner';

interface AllOffersProps {
  searchTerm?: string;
}

export const AllOffers = ({ searchTerm = '' }: AllOffersProps) => {
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const result = await ApiUtils.search.searchServices(searchTerm);
        setServices(result);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {services.length > 0 ? (
        services.map((offer) => <Offer key={offer.id} {...offer} />)
      ) : (
        <div className={styles.noResults}>
          {searchTerm
            ? `No services matching "${searchTerm}" found`
            : 'No services available'}
        </div>
      )}
    </div>
  );
};
