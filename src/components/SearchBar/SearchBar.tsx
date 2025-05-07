import styles from './SearchBar.module.scss';
import SearchSVG from 'src/assets/svgs/search.svg';
import MapPointSVG from 'src/assets/svgs/map-point.svg';
import { useState } from 'react';
import LogoSVG from 'src/assets/svgs/logo-text.svg';
import FilterSVG from 'src/assets/svgs/filter.svg';

interface SearchBarProps {
  isScrolled?: boolean;
  scrollPosition?: number;
  scrollDirection?: 'up' | 'down' | null;
}

export const SearchBar = ({
  isScrolled = false,
  scrollDirection = null,
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useState('Cracow, Poland');

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const getScrollClass = () => {
    if (!isScrolled) return '';
    return scrollDirection === 'down' ? styles.minimized : styles.scrolledUp;
  };

  return (
    <div className={`${styles.container} ${getScrollClass()}`}>
      <div className={styles.topSection}>
        <img src={LogoSVG} alt="Logo" className={styles.logo} />
        <div className={styles.locationArea}>
          <div className={styles.locationLabel}>Location</div>
          <div className={styles.locationValue}>
            <div className={styles.locationPin}>
              <img src={MapPointSVG} alt="map point" />
            </div>
            <div className={styles.locationText}>{location}</div>
            <div className={styles.locationDropdown}>▼</div>
          </div>
        </div>
      </div>

      <div className={styles.searchControls}>
        <div className={styles.searchInputContainer}>
          <img className={styles.searchIcon} src={SearchSVG} alt="Search" />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </div>
        <button className={styles.filterButton} title="Filter options">
          <img src={FilterSVG} alt="filter svg" />
        </button>
      </div>
    </div>
  );
};
