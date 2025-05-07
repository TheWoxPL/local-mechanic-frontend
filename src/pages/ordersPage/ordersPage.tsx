import { useEffect, useState, useRef } from 'react';
import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './ordersPage.module.scss';
import ApiUtils from 'src/shared/api/apiUtils';
import { OrderDto } from 'src/shared/dtos/order.dto';
import { useNavigate } from 'react-router';
import MapPointSVG from 'src/assets/svgs/map-point.svg';
import ClockSVG from 'src/assets/svgs/clock.svg';
import Spinner from 'src/components/Spinner/Spinner';

type ViewMode = 'upcoming' | 'completed';

// Helper functions
const isOrderExpired = (scheduledDate: Date): boolean => {
  const now = new Date();
  return new Date(scheduledDate) < now;
};

// Format date parts
const formatDate = (
  dateString: string | Date
): { day: string; monthYear: string; time: string } => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const monthYear = date.toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });
  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { day, monthYear, time };
};

const getStatusClass = (scheduledDate: Date): string => {
  const now = new Date();
  const orderDate = new Date(scheduledDate);

  if (orderDate < now) {
    return styles.completed;
  } else {
    const timeDifference = orderDate.getTime() - now.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference <= 1 ? styles.confirmed : styles.pending;
  }
};

export const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderDto[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('upcoming');
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  // Refs for swipe gesture
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userOrders = await ApiUtils.orders.getUserOrders();
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on viewMode
  useEffect(() => {
    if (orders.length > 0) {
      if (viewMode === 'upcoming') {
        setFilteredOrders(
          orders.filter((order) => !isOrderExpired(order.scheduledDate))
        );
      } else {
        setFilteredOrders(
          orders.filter((order) => isOrderExpired(order.scheduledDate))
        );
      }
    } else {
      setFilteredOrders([]);
    }
  }, [orders, viewMode]);

  // Handle resign order action
  const handleResignOrder = async (orderId: string) => {
    try {
      // In a real implementation, this would call the backend API
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  // Navigate to order details
  const handleOrderDetails = (serviceId: string) => {
    navigate(`/offer-details/${serviceId}`);
  };

  // Switch tab between upcoming and completed
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

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || animating) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold (80px)
    if (Math.abs(diff) > 80) {
      if (diff > 0) {
        // Swipe left -> Switch to completed
        if (viewMode === 'upcoming') switchTab('completed');
      } else {
        // Swipe right -> Switch to upcoming
        if (viewMode === 'completed') switchTab('upcoming');
      }
    }

    touchStartX.current = null;
  };

  // Show loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner />
        <NavigatorBar indicatorIndex={2} />
      </div>
    );
  }

  // Get first letter for service logo
  const getServiceInitial = (title: string): string => {
    return title.charAt(0).toUpperCase();
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.header}>
        <h1>My Orders</h1>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${viewMode === 'upcoming' ? styles.active : ''}`}
          onClick={() => switchTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`${styles.tab} ${viewMode === 'completed' ? styles.active : ''}`}
          onClick={() => switchTab('completed')}
        >
          Completed
        </button>
      </div>

      <div className={`${styles.content} ${animating ? styles.animating : ''}`}>
        {filteredOrders.length > 0 ? (
          <div className={styles.orders}>
            {filteredOrders.map((order) => {
              const expired = isOrderExpired(order.scheduledDate);
              const statusClass = getStatusClass(order.scheduledDate);
              const { day, monthYear, time } = formatDate(order.scheduledDate);

              return (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.mainInfo}>
                    <div className={styles.serviceLogo}>
                      {getServiceInitial(order.service.title)}
                    </div>
                    <div className={styles.serviceInfo}>
                      <div className={styles.serviceTitle}>
                        {order.service.title}
                      </div>
                      <div className={styles.companyName}>
                        {order.service.company.companyName}
                      </div>
                    </div>
                    <div className={styles.dateInfo}>
                      <div className={styles.day}>{day}</div>
                      <div className={styles.monthYear}>{monthYear}</div>
                      <div className={styles.time}>{time}</div>
                    </div>
                  </div>

                  <div className={styles.divider}></div>

                  <div className={styles.detailsRow}>
                    <div className={styles.detail}>
                      <img
                        src={MapPointSVG}
                        alt="Location"
                        className={styles.icon}
                      />
                      <span className={styles.label}>Workshop Location</span>
                    </div>
                    <div className={styles.price}>
                      {order.price}
                      <span className={styles.currency}>
                        {order.service.currency.name}
                      </span>
                    </div>
                  </div>

                  <div className={styles.detailsRow}>
                    <div className={styles.detail}>
                      <img
                        src={ClockSVG}
                        alt="Duration"
                        className={styles.icon}
                      />
                      <span className={styles.label}>
                        {order.service.estimatedTime}{' '}
                        {order.service.timeUnit.name}
                      </span>
                    </div>
                  </div>

                  {!expired && (
                    <div className={styles.actions}>
                      <button
                        className={styles.details}
                        onClick={() => handleOrderDetails(order.service.id)}
                      >
                        View Details
                      </button>
                      <button
                        className={styles.resign}
                        onClick={() => handleResignOrder(order.id)}
                      >
                        Resign
                      </button>
                    </div>
                  )}

                  {expired && (
                    <div className={styles.actions}>
                      <button
                        className={styles.details}
                        onClick={() => handleOrderDetails(order.service.id)}
                      >
                        View Details
                      </button>
                    </div>
                  )}

                  <div className={`${styles.status} ${statusClass}`}>
                    {expired
                      ? 'Completed'
                      : statusClass === styles.confirmed
                        ? 'Confirmed'
                        : 'Pending'}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.icon}>
              {viewMode === 'upcoming' ? '📅' : '✓'}
            </div>
            <div className={styles.title}>
              {viewMode === 'upcoming'
                ? 'No upcoming orders'
                : 'No completed orders'}
            </div>
            <div className={styles.message}>
              {viewMode === 'upcoming'
                ? "You don't have any upcoming service appointments."
                : "You haven't completed any service orders yet."}
            </div>
            {viewMode === 'upcoming' && (
              <button
                className={styles.browseButton}
                onClick={() => navigate('/home')}
              >
                Browse Services
              </button>
            )}
          </div>
        )}
      </div>

      <NavigatorBar indicatorIndex={2} />
    </div>
  );
};
