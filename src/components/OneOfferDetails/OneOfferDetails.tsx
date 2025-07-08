import styles from './OneOfferDetails.module.scss';
import ServiceIMG from '../../assets/images/default-car-service.png';
import BackSVG from '../../assets/svgs/back.svg';
import HeartSVG from '../../assets/svgs/heart.svg';
import HeartRedSVG from '../../assets/svgs/heart-red.svg';
import StarSVG from '../../assets/svgs/star.svg';
import MapPointSVG from '../../assets/svgs/map-point.svg';
import ClockSVG from '../../assets/svgs/clock.svg';
import PhoneSVG from '../../assets/svgs/phone.svg';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Calendar from '../Calendar/Calendar';
import ApiUtils from 'src/shared/api/apiUtils';
import { CreateOrderDto } from 'src/shared/dtos/create-order.dto';
import { ServiceDTO } from 'src/shared/dtos';
import Spinner from '../Spinner/Spinner';
import { AvailableSlot } from 'src/types/AvailableSlot';

interface OneOfferDetailsProps {
  serviceId: string;
  availableSlots?: AvailableSlot[];
  isLoading?: boolean;
}

export const OneOfferDetails: React.FC<OneOfferDetailsProps> = ({
  serviceId,
  availableSlots,
  isLoading: slotsLoading = false,
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [service, setService] = useState<ServiceDTO>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [estimatedTimeInMinutes, setEstimatedTimeInMinutes] =
    useState<number>(30);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const fetchedService =
          await ApiUtils.services.getServiceById(serviceId);
        setService(fetchedService);

        if (fetchedService && fetchedService.estimatedTime) {
          const estimatedTime = parseInt(fetchedService.estimatedTime, 10);
          setEstimatedTimeInMinutes(estimatedTime);
        }

        const favoriteResponse =
          await ApiUtils.favorites.isServiceFavorite(serviceId);
        setIsFavorite(favoriteResponse.isFavorite);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await ApiUtils.favorites.removeServiceFromFavorites(serviceId);
      } else {
        await ApiUtils.favorites.addServiceToFavorites(serviceId);
      }
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };

  if (isFetching) {
    return <Spinner />;
  }

  const handleSelectData = (date: Date) => {
    setSelectedDate(date);
  };

  const handleOrder = async () => {
    try {
      const createOrderDto: CreateOrderDto = {
        serviceId: serviceId,
        scheduledDate: new Date(selectedDate!),
        notes: 'mock',
        price: service.price,
      };
      await ApiUtils.orders.addOrder(createOrderDto).finally(() => {
        navigate('/orders');
      });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={service.imageUrl || ServiceIMG} alt="service image" />
        <div className={styles.back} onClick={() => navigate(-1)}>
          <img src={BackSVG} alt="back button" />
        </div>
        <div className={styles.favorite} onClick={handleFavoriteToggle}>
          {isFavorite ? (
            <img src={HeartRedSVG} alt="heart button" />
          ) : (
            <img src={HeartSVG} alt="heart button" />
          )}
        </div>
        <div className={styles.rating}>
          <span>{service.averageRating}</span>
          <img src={StarSVG} alt="Star" />
          <span>({service.opinionCount})</span>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{service.title}</div>
        <div className={styles.company}>{service.company.companyName}</div>
        <div className={styles.description}>{service.description}</div>
        <div className={styles.shortInfo}>
          <div className={styles.shortInfoLeft}>
            <div className={styles.oneShortInfo}>
              <img src={MapPointSVG} alt="alternative" />
              <div className={styles.info}>
                <div className={styles.main}>{'Kraków długa 12a'}</div>
                <div className={styles.additional}>{'3.5 km stąd'}</div>
              </div>
            </div>
            <div className={styles.oneShortInfo}>
              <img src={ClockSVG} alt="alternative" />
              <div className={styles.info}>
                <div className={styles.main}>
                  {service.estimatedTime} {service.timeUnit.name}
                </div>
              </div>
            </div>
            {service.company.phoneNumber && (
              <div className={styles.oneShortInfo}>
                <img src={PhoneSVG} alt="Phone icon" />
                <div className={styles.info}>
                  <div className={styles.main}>
                    {service.company.phoneNumber}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.price}>
            <div className={styles.charge}>
              {service.price}
              <span>{service.currency.name}</span>
            </div>
            <div className={styles.serviceUnit}>
              <span>per </span> <span>{service.serviceUnit.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.reservation}>
        {slotsLoading ? (
          <Spinner />
        ) : (
          <Calendar
            handleSelectData={handleSelectData}
            availableTimeslots={availableSlots}
            estimatedTimeInMinutes={estimatedTimeInMinutes}
          />
        )}
      </div>
      {selectedDate && (
        <button className={styles.orderButton} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );
};
