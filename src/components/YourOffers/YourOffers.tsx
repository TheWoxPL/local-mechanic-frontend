import { YourOffer } from '../YourOffer/YourOffer';
import styles from './YourOffers.module.scss';
import img from '../../assets/images/car-fix.jpg';
import { YourOfferProps } from 'src/types';
import { AddServiceForm } from '../AddServiceForm/AddServiceForm';
import { useState } from 'react';

export const YourOffers = () => {
  const [isAddServiceFormVisible, setIsAddServiceFormVisible] = useState(false);
  const handleAddNewServiceClick = () => {
    setIsAddServiceFormVisible(true);
  };

  const offers: YourOfferProps[] = [
    {
      uuid: Math.random().toString(),
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
      views: 22,
      orders: 5,
      favourites: 2,
    },
    {
      uuid: Math.random().toString(),
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
      views: 12,
      orders: 32,
      favourites: 22,
    },
    {
      uuid: Math.random().toString(),
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
      views: 12,
      orders: 1,
      favourites: 1,
    },
    {
      uuid: Math.random().toString(),
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
      views: 12,
      orders: 13,
      favourites: 12,
    },
    {
      uuid: Math.random().toString(),
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
      views: 12,
      orders: 31,
      favourites: 21,
    },
    {
      uuid: Math.random().toString(),
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
      views: 12,
      orders: 1,
      favourites: 4,
    },
  ];

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
        {offers.map((offer) => {
          return <YourOffer key={offer.uuid} {...offer} />;
        })}
      </div>
    </div>
  );
};
