import styles from './SearchBarSuggestionsList.module.scss';
import SearchSVG from 'src/assets/svgs/search.svg';
import FilterSVG from 'src/assets/svgs/filter.svg';
import BackSVG from 'src/assets/svgs/back.svg';
import { useRef, useEffect } from 'react';
import { SearchSuggestionDto } from 'src/shared/dtos';

interface SearchBarSuggestionsListProps {
  searchText: string;
  suggestions: SearchSuggestionDto[];
  onSearchTextChange: (value: string) => void;
  onSuggestionClick: (suggestion: SearchSuggestionDto) => void;
  onClose: () => void;
  isLoading?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const SearchBarSuggestionsList = ({
  searchText,
  suggestions,
  onSearchTextChange,
  onSuggestionClick,
  onClose,
  isLoading = false,
  onKeyDown,
}: SearchBarSuggestionsListProps) => {
  const overlayInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (overlayInputRef.current) {
      overlayInputRef.current.focus();
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTextChange(e.target.value);
  };

  return (
    <div className={styles.suggestionsDropdown}>
      <div className={styles.searchOverlayHeader}>
        <button
          className={styles.backButton}
          onClick={onClose}
          aria-label="Close search"
        >
          <img src={BackSVG} alt="Back" />
        </button>
        <div className={styles.searchInputOverlay}>
          <img src={SearchSVG} alt="Search" />
          <input
            ref={overlayInputRef}
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={onKeyDown}
            autoFocus
          />
        </div>
        <button className={styles.filterButtonOverlay} title="Filter options">
          <img src={FilterSVG} alt="filter svg" />
        </button>
      </div>

      <div className={styles.suggestionsContainer}>
        {isLoading ? (
          <div className={styles.noResults}>Loading suggestions...</div>
        ) : suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className={styles.suggestionItem}
              onClick={() => onSuggestionClick(suggestion)}
            >
              <div className={styles.suggestionName}>{suggestion.name}</div>
              <div className={styles.suggestionCategory}>
                {suggestion.category}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            {searchText.trim() !== ''
              ? 'No matching services found'
              : 'Type to search for services'}
          </div>
        )}
      </div>
    </div>
  );
};
