import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './homePage.module.scss';
import { AllOffers } from 'src/components/AllOffers/AllOffers';
import { SearchBar } from 'src/components/SearchBar/SearchBar';
import { useRef, useState } from 'react';
import { HomeHero } from 'src/components/HomeHero/HomeHero';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const offersSectionRef = useRef<HTMLElement | null>(null);

  const quickFilters = [
    'Diagnostics',
    'Tires change',
    'AC service',
    'Brake repair',
    'Scheduled inspection',
  ];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleQuickFilter = (filter: string) => {
    setSearchTerm(filter);
  };

  const handleScrollToOffers = () => {
    offersSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className={styles.container}>
      <section className={styles.searchWrapper}>
        <SearchBar onSearch={handleSearch} />
      </section>
      <HomeHero onPrimaryCtaClick={handleScrollToOffers} />

      <section className={styles.sectionHeader}>
        <div>
          <h2>Most requested services near you</h2>
          <p>Browse offers tailored for drivers in and around your city.</p>
        </div>
        <div className={styles.quickFilters}>
          {quickFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`${styles.filterChip} ${
                searchTerm === filter ? styles.filterChipActive : ''
              }`}
              onClick={() => handleQuickFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section ref={offersSectionRef} className={styles.offersSection}>
        <AllOffers searchTerm={searchTerm} />
      </section>

      <NavigatorBar indicatorIndex={0} />
    </div>
  );
};
