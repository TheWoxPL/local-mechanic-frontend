import styles from './Offer.module.scss';
import StarSVG from 'src/assets/svgs/star.svg';
import HeartSVG from 'src/assets/svgs/heart.svg';
import HeartRedSVG from 'src/assets/svgs/heart-red.svg';
import MapPointSVG from 'src/assets/svgs/map-point.svg';
import ClockSVG from 'src/assets/svgs/clock.svg';
import { useState } from 'react';
import { ServiceDTO } from 'src/shared/dtos';
import img from '../../assets/images/car-fix.jpg';
import { useNavigate } from 'react-router';

export const Offer: React.FC<ServiceDTO> = ({
  // rating,
  // countOpinions,
  id,
  title,
  description,
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
  // favourites,
}) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const rating = 4.6;
  const countOpinions = 14;
  const location = 'Kraków, Długa 12a';
  const distance = '3.5km';
  const navigate = useNavigate();

  const handleFavouriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(id);
    setIsFavourite((prevState) => !prevState);
  };
  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate('/offer-details');
      }}
    >
      <div className={styles.left}>
        <div className={styles.opinions}>
          <div className={styles.rating}>{rating}</div>
          <img src={StarSVG} alt="Star svg" />
          <div className={styles.opinionsCount}>({countOpinions})</div>
        </div>
        <img src={img} alt="Image of service" />
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className={styles.name}>{title}</div>
            <div className={styles.company}>
              {company.companyName}
              {description}
            </div>
          </div>
          {isFavourite ? (
            <img
              className={styles.favourite}
              src={HeartRedSVG}
              alt="Favourite, filled read heart"
              onClick={handleFavouriteClick}
            />
          ) : (
            <img
              className={styles.favourite}
              src={HeartSVG}
              alt="Favourite, empty heart"
              onClick={handleFavouriteClick}
            />
          )}
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
  );
};
