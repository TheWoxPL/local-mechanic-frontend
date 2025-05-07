import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './homePage.module.scss';
import { AllOffers } from 'src/components/AllOffers/AllOffers';
import { SearchBar } from 'src/components/SearchBar/SearchBar';
import { useState, useRef } from 'react';

export const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null
  );
  const prevScrollPosition = useRef(0);
  const scrollThreshold = 40;

  const handleScrollUpdate = (position: number) => {
    setScrollPosition(position);
    setIsScrolled(position > scrollThreshold);

    if (position > prevScrollPosition.current) {
      setScrollDirection('down');
    } else if (position < prevScrollPosition.current) {
      setScrollDirection('up');
    }
    prevScrollPosition.current = position;
  };

  return (
    <div className={styles.container}>
      <SearchBar
        isScrolled={isScrolled}
        scrollPosition={scrollPosition}
        scrollDirection={scrollDirection}
      />
      <AllOffers onScroll={handleScrollUpdate} />
      <NavigatorBar indicatorIndex={0} />
    </div>
  );
};
