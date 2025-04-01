import { YourOffer } from '../YourOffer/YourOffer';
import styles from './YourOffers.module.scss';
import { AddServiceForm } from '../AddServiceForm/AddServiceForm';
import { useEffect, useState } from 'react';
import { ServiceDTO } from 'src/shared/dtos';
import ApiUtils from 'src/shared/api/apiUtils';

interface YourOffersProps {
  companyId: string;
}

// TODO: check why data is fetch when companyId is undefined
export const YourOffers = ({ companyId }: YourOffersProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const [yourServices, setYourServices] = useState<ServiceDTO[]>([]);
  const [isAddServiceFormVisible, setIsAddServiceFormVisible] = useState(false);
  const handleAddNewServiceClick = () => {
    setIsAddServiceFormVisible(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (companyId !== undefined) {
          const fetchedServices =
            await ApiUtils.services.getAllServicesByCompanyId(companyId);
          setYourServices(fetchedServices);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [companyId]);

  if (isFetching) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      {isAddServiceFormVisible && (
        <AddServiceForm
          setIsAddServiceFormVisible={setIsAddServiceFormVisible}
        />
      )}
      <div className={styles.AddService}>
        <button onClick={handleAddNewServiceClick}>Add new service</button>
      </div>
      <div className={styles.line}></div>
      <div className={styles.allOffers}>
        {yourServices.map((offer) => {
          return <YourOffer key={offer.id} {...offer} />;
        })}
      </div>
    </div>
  );
};
