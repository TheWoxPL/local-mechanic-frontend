import { useEffect, useState, useRef } from 'react';
import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './favoritePage.module.scss';
import ApiUtils from 'src/shared/api/apiUtils';
import { ServiceDTO } from 'src/shared/dtos';
import { useNavigate } from 'react-router';
import Spinner from 'src/components/Spinner/Spinner';
import { Offer } from 'src/components/Offer/Offer';

type ViewMode = 'services' | 'companies';

export const FavoritePage = () => {
  const [favoriteServices, setFavoriteServices] = useState<ServiceDTO[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('services');
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const userFavoriteServices =
          await ApiUtils.services.getFavoritesForUser();
        setFavoriteServices(userFavoriteServices);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const switchTab = (mode: ViewMode) => {
    if (animating || mode === viewMode) return;

    setAnimating(true);

    setTimeout(() => {
      setViewMode(mode);
      setTimeout(() => {
        setAnimating(false);
      }, 300);
    }, 100);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || animating) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 80) {
      if (diff > 0) {
        if (viewMode === 'services') switchTab('companies');
      } else {
        if (viewMode === 'companies') switchTab('services');
      }
    }

    touchStartX.current = null;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner />
        <NavigatorBar indicatorIndex={1} />
      </div>
    );
  }

  const renderEmptyState = (isServices: boolean) => {
    return (
      <div className={styles.emptyState}>
        <div className={styles.icon}>{isServices ? '❤️' : '🏢'}</div>
        <div className={styles.title}>
          {isServices ? 'No favorite services' : 'Coming Soon'}
        </div>
        <div className={styles.message}>
          {isServices
            ? "You haven't added any services to your favorites yet."
            : 'Favorite companies feature will be implemented soon.'}
        </div>
        {isServices && (
          <button
            className={styles.browseButton}
            onClick={() => navigate('/home')}
          >
            Browse Services
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.header}>
        <h1>My Favorites</h1>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${viewMode === 'services' ? styles.active : ''}`}
          onClick={() => switchTab('services')}
        >
          Services
        </button>
        <button
          className={`${styles.tab} ${viewMode === 'companies' ? styles.active : ''}`}
          onClick={() => switchTab('companies')}
        >
          Companies
        </button>
      </div>

      <div className={`${styles.content} ${animating ? styles.animating : ''}`}>
        {viewMode === 'services' ? (
          favoriteServices.length > 0 ? (
            <div className={styles.offers}>
              {favoriteServices.map((service) => (
                <Offer key={service.id} {...service} />
              ))}
            </div>
          ) : (
            renderEmptyState(true)
          )
        ) : (
          // Companies tab - empty placeholder for future implementation
          renderEmptyState(false)
        )}
      </div>

      <NavigatorBar indicatorIndex={1} />
    </div>
  );
};
