import styles from './YourOffer.module.scss';
import StarSVG from 'src/assets/svgs/star.svg';
import MapPointSVG from 'src/assets/svgs/map-point.svg';
import ClockSVG from 'src/assets/svgs/clock.svg';
import TrashSVG from 'src/assets/svgs/trash.svg';
import EditSVG from 'src/assets/svgs/edit.svg';
import { YourOfferProps } from 'src/types/YourOfferProps';

export const YourOffer: React.FC<YourOfferProps> = ({
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
  orders,
  views,
  favourites,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
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
            <img className={styles.delete} src={TrashSVG} alt="Trash svg" />
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
      <div className={styles.bottomData}>
        <div className={styles.data}>
          <div className={styles.oneData}>views: {views}</div>
          <div className={styles.oneData}>orders: {orders}</div>
          <div className={styles.oneData}>favourites: {favourites}</div>
        </div>
        <img src={EditSVG} alt=" Edit icon" />
      </div>
    </div>
  );
};
