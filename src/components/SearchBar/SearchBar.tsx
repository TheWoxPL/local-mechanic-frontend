import styles from './SearchBar.module.scss';
import SearchSVG from 'src/assets/svgs/search.svg';
import { useState, useEffect, useRef } from 'react';
import MapPointSVG from 'src/assets/svgs/map-point.svg';
import LogoSVG from 'src/assets/svgs/logo-text.svg';
import FilterSVG from 'src/assets/svgs/filter.svg';
import { SearchBarSuggestionsList } from '../SearchBarSuggestionsList/SearchBarSuggestionsList';
import ApiUtils from 'src/shared/api/apiUtils';
import { SearchSuggestionDto } from 'src/shared/dtos';
import { debounce } from 'lodash';

export const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestionDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  // Debounced search function to prevent too many API calls
  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      if (query.trim() === '') {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      try {
        const results = await ApiUtils.search.getSuggestions(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300)
  ).current;

  const handleSearchTextChange = (value: string) => {
    setSearchText(value);
    setIsLoading(true);
    debouncedSearch(value);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchTextChange(e.target.value);
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true);
    document.body.style.overflow = 'hidden';

    if (searchText.trim() === '') {
      setIsLoading(true);
      debouncedSearch('');
    }
  };

  const handleSuggestionsClose = () => {
    setShowSuggestions(false);
    document.body.style.overflow = '';
  };

  const handleSuggestionClick = (suggestion: SearchSuggestionDto) => {
    setSearchText(suggestion.name);
    setShowSuggestions(false);
    document.body.style.overflow = '';
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

      {showSuggestions && (
        <SearchBarSuggestionsList
          searchText={searchText}
          suggestions={suggestions}
          onSearchTextChange={handleSearchTextChange}
          onSuggestionClick={handleSuggestionClick}
          onClose={handleSuggestionsClose}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
