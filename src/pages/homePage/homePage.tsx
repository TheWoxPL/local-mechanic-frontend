import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './homePage.module.scss';
import { AllOffers } from 'src/components/AllOffers/AllOffers';
import { SearchBar } from 'src/components/SearchBar/SearchBar';
import { useState } from 'react';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <AllOffers searchTerm={searchTerm} />
      <NavigatorBar indicatorIndex={0} />
    </div>
  );
};
