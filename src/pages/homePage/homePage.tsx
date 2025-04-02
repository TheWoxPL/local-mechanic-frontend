import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './homePage.module.scss';
import { AllOffers } from 'src/components/AllOffers/AllOffers';
import { SearchBar } from 'src/components/SearchBar/SearchBar';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <SearchBar />
      <AllOffers />
      <NavigatorBar indicatorIndex={0} />
    </div>
  );
};
