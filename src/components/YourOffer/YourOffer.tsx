import styles from './YourOffer.module.scss';
import StarSVG from 'src/assets/svgs/star.svg';
import MapPointSVG from 'src/assets/svgs/map-point.svg';
import ClockSVG from 'src/assets/svgs/clock.svg';
import TrashSVG from 'src/assets/svgs/trash.svg';
import EditSVG from 'src/assets/svgs/edit.svg';

import img from '../../assets/images/default-car-service.png';
import { ServiceDTO } from 'src/shared/dtos';
import { useState } from 'react';
import ApiUtils from 'src/shared/api/apiUtils';

export const YourOffer: React.FC<
  ServiceDTO & { fetchServices: () => void }
> = ({
  // rating,
  // countOpinions,
  id,
  title,
  estimatedTime,
  timeUnit,
  serviceAvailability,
  price,
  currency,
  serviceUnit,
  // location,
  // distance,
  company,
  // orders,
  // views,
  // favorites,
  fetchServices,
  imageUrl,
}) => {
  const rating = 4.6;
  const countOpinions = 14;
  const location = 'Kraków, Długa 12a';
  const distance = '3.5km';
  const orders = 5;
  const views = 22;
  const favorites = 2;

  const [isConfirmRemoveVisible, setIsConfirmRemoveVisible] = useState(false);

  const handleRemoveClick = () => {
    setIsConfirmRemoveVisible(true);
  };

  const handleConfirmRemove = async () => {
    await ApiUtils.services.deleteServiceById(id);
    // setIsConfirmRemoveVisible(false);
    fetchServices();
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.confirmRemove} ${
          isConfirmRemoveVisible ? styles.visible : ''
        }`}
      >
        <div className={styles.title}>Remove ?</div>
        <div className={styles.buttons}>
          <button className={styles.yes} onClick={handleConfirmRemove}>
            Yes
          </button>
          <button
            className={styles.no}
            onClick={() => setIsConfirmRemoveVisible(false)}
          >
            No
          </button>
        </div>
      </div>
      <div
        className={`${styles.top} ${
          isConfirmRemoveVisible ? styles.blurred : ''
        }`}
      >
        <div className={styles.left}>
          <div className={styles.opinions}>
            <div className={styles.rating}>{rating}</div>
            <img src={StarSVG} alt="Star svg" />
            <div className={styles.opinionsCount}>({countOpinions})</div>
          </div>
          <img src={imageUrl || img} alt="Image of service" />
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <div className={styles.title}>
              <div className={styles.name}>{title}</div>
              <div className={styles.company}>{company.companyName}</div>
            </div>
            <img
              className={styles.delete}
              src={TrashSVG}
              alt="Trash svg"
              onClick={handleRemoveClick}
            />
          </div>

          <div className={styles.shortInfo}>
            <div className={styles.oneShortInfo}>
              <img src={MapPointSVG} alt="alternative" />
              <div className={styles.info}>
                <div className={styles.main}>{location}</div>
                <div className={styles.additional}>{distance}</div>
              </div>
            </div>
            <div className={styles.oneShortInfo}>
              <img src={ClockSVG} alt="alternative" />
              <div className={styles.info}>
                <div className={styles.main}>
                  {estimatedTime} {timeUnit.name}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.availability}>
              availability:{' '}
              <span className={styles.bold}>{serviceAvailability.name}</span>
            </div>
            <div className={styles.price}>
              <div className={styles.charge}>
                {price}
                <span>{currency.name}</span>
              </div>
              <div className={styles.serviceUnit}>
                <span>per </span> <span>{serviceUnit.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.bottomData} ${
          isConfirmRemoveVisible ? styles.blurred : ''
        }`}
      >
        <div className={styles.data}>
          <div className={styles.oneData}>views: {views}</div>
          <div className={styles.oneData}>orders: {orders}</div>
          <div className={styles.oneData}>favorites: {favorites}</div>
        </div>
        <img src={EditSVG} alt=" Edit icon" />
      </div>
    </div>
  );
};
