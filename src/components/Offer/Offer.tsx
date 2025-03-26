import styles from './Offer.module.scss';
import StarSVG from 'src/assets/svgs/star.svg';
import HeartSVG from 'src/assets/svgs/heart.svg';
import HeartRedSVG from 'src/assets/svgs/heart-red.svg';
import MapPointSVG from 'src/assets/svgs/map-point.svg';
import ClockSVG from 'src/assets/svgs/clock.svg';
import { useState } from 'react';
import { OfferProps } from 'src/types';

export const Offer: React.FC<OfferProps> = ({
  uuid,
  isFavorite,
  img,
  rating,
  countOpinions,
  name,
  company,
  location,
  distance,
  estimatedTime,
  availability,
  price,
  serviceUnit,
}) => {
  const [isFavourite, setIsFavourite] = useState(isFavorite);

  const handleFavouriteClick = () => {
    console.log(uuid);
    setIsFavourite((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
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
            <div className={styles.name}>{name}</div>
            <div className={styles.company}>{company}</div>
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
              <div className={styles.main}>{estimatedTime}</div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.availability}>
            dostępność: <span className={styles.bold}>{availability}</span>
          </div>
          <div className={styles.price}>
            <div className={styles.charge}>{price}</div>
            <div className={styles.serviceUnit}>{serviceUnit}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
