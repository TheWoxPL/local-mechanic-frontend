import styles from './SearchBar.module.scss';
import SearchSVG from 'src/assets/svgs/search.svg';
import { useState, useEffect, useRef } from 'react';
import MapPointSVG from 'src/assets/svgs/map-point.svg';
import LogoSVG from 'src/assets/svgs/logo-text.svg';
import FilterSVG from 'src/assets/svgs/filter.svg';
import { SearchBarSuggestionsList } from '../SearchBarSuggestionsList/SearchBarSuggestionsList';

// Mock data for search suggestions
const MOCK_SUGGESTIONS = [
  { id: 1, name: 'Oil Change Service', category: 'Maintenance' },
  { id: 2, name: 'Tire Replacement', category: 'Tires' },
  { id: 3, name: 'Brake Repair', category: 'Repair' },
  { id: 4, name: 'Engine Diagnostics', category: 'Diagnostics' },
  { id: 5, name: 'Air Conditioning Service', category: 'Maintenance' },
  { id: 6, name: 'Battery Replacement', category: 'Electrical' },
  { id: 7, name: 'Wheel Alignment', category: 'Tires' },
  { id: 8, name: 'Suspension Repair', category: 'Repair' },
  { id: 9, name: 'Transmission Service', category: 'Maintenance' },
  { id: 10, name: 'Exhaust System Repair', category: 'Repair' },
  { id: 11, name: 'Radiator Flush', category: 'Maintenance' },
  { id: 12, name: 'Car Detailing', category: 'Cosmetic' },
  { id: 13, name: 'Headlight Replacement', category: 'Electrical' },
  { id: 14, name: 'Windshield Repair', category: 'Glass' },
  { id: 15, name: 'Fuel System Cleaning', category: 'Maintenance' },
  { id: 16, name: 'Clutch Replacement', category: 'Transmission' },
];

interface SearchSuggestion {
  id: number;
  name: string;
  category: string;
}

export const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useState('Cracow, Poland');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null
  );
  const lastScrollPosition = useRef(0);
  const scrollThreshold = 20;
  const searchInputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearchTextChange = (value: string) => {
    setSearchText(value);

    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      // Filter suggestions based on input
      const filteredSuggestions = MOCK_SUGGESTIONS.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchTextChange(e.target.value);
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true);
    // Prevent scrolling of the background
    document.body.style.overflow = 'hidden';
  };

  const handleSuggestionsClose = () => {
    setShowSuggestions(false);
    document.body.style.overflow = '';
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchText(suggestion.name);
    setShowSuggestions(false);
    document.body.style.overflow = '';
    // Here you would typically trigger a search with the selected suggestion
  };

  const getScrollClass = () => {
    if (!isScrolled) return '';
    return scrollDirection === 'down' ? styles.minimized : styles.scrolledUp;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledState = currentScrollY > scrollThreshold;
      if (currentScrollY > lastScrollPosition.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollPosition.current) {
        setScrollDirection('up');
      }

      setIsScrolled(scrolledState);
      lastScrollPosition.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Ensure body scrolling is restored when component unmounts
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={`${styles.container} ${getScrollClass()}`}
      ref={containerRef}
    >
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
        <div
          className={styles.searchInputContainer}
          ref={searchInputRef}
          onClick={handleSearchFocus}
        >
          <img className={styles.searchIcon} src={SearchSVG} alt="Search" />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChange={handleSearchInputChange}
            onFocus={handleSearchFocus}
          />
        </div>
        <button className={styles.filterButton} title="Filter options">
          <img src={FilterSVG} alt="filter svg" />
        </button>
      </div>

      {/* Render the SearchBarSuggestionsList component */}
      {showSuggestions && (
        <SearchBarSuggestionsList
          searchText={searchText}
          suggestions={suggestions}
          onSearchTextChange={handleSearchTextChange}
          onSuggestionClick={handleSuggestionClick}
          onClose={handleSuggestionsClose}
        />
      )}
    </div>
  );
};
