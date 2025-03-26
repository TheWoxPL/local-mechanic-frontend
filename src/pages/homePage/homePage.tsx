import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './homePage.module.scss';
import { AllOffers } from 'src/components/AllOffers/AllOffers';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <NavigatorBar indicatorIndex={0} />
      <AllOffers />
    </div>
  );
};
