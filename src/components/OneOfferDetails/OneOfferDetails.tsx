import styles from './OneOfferDetails.module.scss';
import ServiceIMG from '../../assets/images/car-fix.jpg';
import BackSVG from '../../assets/svgs/back.svg';
import HeartSVG from '../../assets/svgs/heart.svg';
import HeartRedSVG from '../../assets/svgs/heart-red.svg';
import StarSVG from '../../assets/svgs/star.svg';
import MapPointSVG from '../../assets/svgs/map-point.svg';
import ClockSVG from '../../assets/svgs/clock.svg';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Calendar from '../Calendar/Calendar';

export const OneOfferDetails = () => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectData = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={ServiceIMG} alt="service image" />
        <div className={styles.back} onClick={() => navigate(-1)}>
          <img src={BackSVG} alt="back button" />
        </div>
        <div
          className={styles.favorite}
          onClick={() => setIsFavorite((prev) => !prev)}
        >
          {isFavorite ? (
            <img src={HeartRedSVG} alt="heart button" />
          ) : (
            <img src={HeartSVG} alt="heart button" />
          )}
        </div>
        <div className={styles.opinions}>
          <div className={styles.rating}>{4.5}</div>
          <img src={StarSVG} alt="Star svg" />
          <div className={styles.opinionsCount}>({123})</div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>Tire Change</div>
        <div className={styles.company}>serwis motoryzacyjny sp. z o o </div>
        <div className={styles.description}>
          Lorem ipsum lorem ipsum lorem asdasdjasdj abj bd bsa b bja bhjbsa
          hjasbb hdba sdadadsajdbsjhbd jabajssajbsahdbasjdbad bsadjbsajdhabsa
          dbsadjasbd jsabda
        </div>
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
                  {'1-2'} {'H'}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.price}>
            <div className={styles.charge}>
              {2500}
              <span>{'PLN'}</span>
            </div>
            <div className={styles.serviceUnit}>
              <span>per </span> <span>{'service'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.reservation}>
        <Calendar handleSelectData={handleSelectData} />
      </div>
      {selectedDate && <button className={styles.orderButton}>Order</button>}
    </div>
  );
};
