import styles from './Offer.module.scss';
import StarSVG from 'src/assets/svgs/star.svg';
import HeartSVG from 'src/assets/svgs/heart.svg';
import HeartRedSVG from 'src/assets/svgs/heart-red.svg';
import MapPointSVG from 'src/assets/svgs/map-point.svg';
import ClockSVG from 'src/assets/svgs/clock.svg';
import { useState } from 'react';
import { ServiceDTO } from 'src/shared/dtos';
import img from '../../assets/images/default-car-service.png';
import { useNavigate } from 'react-router';
import ApiUtils from 'src/shared/api/apiUtils';

export const Offer: React.FC<ServiceDTO> = ({
  id,
  title,
  estimatedTime,
  timeUnit,
  serviceAvailability,
  price,
  currency,
  serviceUnit,
  company,
  isFavorite,
  imageUrl,
  opinionCount,
  averageRating,
}) => {
  const [isFavoriteVisibility, setIsFavoriteVisibility] = useState(isFavorite);
  const distance = '3.5km';
  const navigate = useNavigate();

  const handleFavoriteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isFavoriteVisibility === false) {
      await ApiUtils.favorites.addServiceToFavorites(id);
    }
    if (isFavoriteVisibility === true) {
      await ApiUtils.favorites.removeServiceFromFavorites(id);
    }

    setIsFavoriteVisibility((prevState) => !prevState);
  };
  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate('/offer-details/' + id);
      }}
    >
      <div className={styles.left}>
        <div className={styles.rating}>
          <span>{averageRating}</span>
          <img src={StarSVG} alt="Star" />
          <span>({opinionCount})</span>
        </div>
        <img src={imageUrl || img} alt="Image of service" />
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className={styles.name}>{title}</div>
            <div className={styles.company}>{company.companyName}</div>
          </div>
          {isFavoriteVisibility ? (
            <img
              className={styles.favorite}
              src={HeartRedSVG}
              alt="Favorite, filled read heart"
              onClick={handleFavoriteClick}
            />
          ) : (
            <img
              className={styles.favorite}
              src={HeartSVG}
              alt="Favorite, empty heart"
              onClick={handleFavoriteClick}
            />
          )}
        </div>

        <div className={styles.shortInfo}>
          <div className={styles.oneShortInfo}>
            <img src={MapPointSVG} alt="alternative" />
            <div className={styles.info}>
              <div className={styles.main}>
                {company.address || 'address not avaible'}
              </div>
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
  );
};
