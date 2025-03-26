import { OfferProps } from 'src/types';
import { Offer } from '../Offer/Offer';
import styles from './AllOffers.module.scss';
import img from '../../assets/images/car-fix.jpg';

export const AllOffers = () => {
  const offers: OfferProps[] = [
    {
      uuid: Math.random().toString(),
      isFavorite: false,
      img: img,
      rating: 4.6,
      countOpinions: 14,
      name: 'Wymiana opon',
      company: 'Your Company Inc.',
      location: 'Kraków, Długa 12a',
      distance: '3.5km',
      estimatedTime: '1-2 h',
      availability: 'Jutro',
      price: '12.99 zł',
      serviceUnit: 'za usługę',
    },
    {
      uuid: Math.random().toString(),
      isFavorite: true,
      img: img,
      rating: 4.9,
      countOpinions: 32,
      name: 'Naprawa silnika',
      company: 'AutoFix Garage',
      location: 'Warszawa, Nowa 5',
      distance: '10km',
      estimatedTime: '3-5 h',
      availability: 'Dzisiaj',
      price: '299.99 zł',
      serviceUnit: 'za usługę',
    },
    {
      uuid: Math.random().toString(),
      isFavorite: false,
      img: img,
      rating: 4.2,
      countOpinions: 8,
      name: 'Przegląd techniczny',
      company: 'Mechanic Pro',
      location: 'Gdańsk, Szeroka 7',
      distance: '1.2km',
      estimatedTime: '2 h',
      availability: 'Pojutrze',
      price: '99.99 zł',
      serviceUnit: 'za usługę',
    },
    {
      uuid: Math.random().toString(),
      isFavorite: true,
      img: img,
      rating: 4.8,
      countOpinions: 20,
      name: 'Wymiana oleju',
      company: 'OilChange Express',
      location: 'Poznań, Krótka 3',
      distance: '5km',
      estimatedTime: '1 h',
      availability: 'Dzisiaj',
      price: '49.99 zł',
      serviceUnit: 'za usługę',
    },
  ];

  return (
    <div className={styles.container}>
      {offers.map((offer) => {
        return <Offer key={offer.uuid} {...offer} />;
      })}
    </div>
  );
};
