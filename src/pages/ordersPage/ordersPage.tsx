import { useEffect, useState, useRef } from 'react';
import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './ordersPage.module.scss';
import ApiUtils from 'src/shared/api/apiUtils';
import { OrderDto } from 'src/shared/dtos/order.dto';
import { useNavigate } from 'react-router';
import MapPointSVG from 'src/assets/svgs/map-point.svg';
import ClockSVG from 'src/assets/svgs/clock.svg';
import Spinner from 'src/components/Spinner/Spinner';
import { ConfirmationModal } from 'src/components/ConfirmationModal/ConfirmationModal';

type ViewMode = 'upcoming' | 'completed';

const getStatusClass = (orderStatus: string): string => {
  switch (orderStatus) {
    case 'PENDING':
      return styles.pending;
    case 'CONFIRMED':
      return styles.confirmed;
    case 'REJECTED':
      return styles.rejected;
    case 'COMPLETED':
      return styles.completed;
    default:
      return styles.pending;
  }
};

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

export const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderDto[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('upcoming');
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [resigningOrder, setResigningOrder] = useState<string | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const navigate = useNavigate();

  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (orders.length > 0) {
      if (viewMode === 'upcoming') {
        setFilteredOrders(
          orders.filter(
            (order) =>
              order.orderStatus === 'PENDING' ||
              order.orderStatus === 'CONFIRMED' ||
              order.orderStatus === 'REJECTED'
          )
        );
      } else {
        setFilteredOrders(
          orders.filter((order) => order.orderStatus === 'COMPLETED')
        );
      }
    } else {
      setFilteredOrders([]);
    }
  }, [orders, viewMode]);

  const handleResignOrder = async (orderId: string) => {
    try {
      setResigningOrder(orderId);
      await ApiUtils.orders.resignOrder(orderId);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error canceling order:', error);
    } finally {
      setResigningOrder(null);
      setOrderToCancel(null);
    }
  };

  const openCancelConfirmation = (orderId: string) => {
    setOrderToCancel(orderId);
  };

  const closeCancelConfirmation = () => {
    setOrderToCancel(null);
  };

  const handleOrderDetails = (serviceId: string) => {
    navigate(`/offer-details/${serviceId}`);
  };

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
        if (viewMode === 'upcoming') switchTab('completed');
      } else {
        if (viewMode === 'completed') switchTab('upcoming');
      }
    }

    touchStartX.current = null;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner />
        <NavigatorBar indicatorIndex={2} />
      </div>
    );
  }

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
      <ConfirmationModal
        isOpen={orderToCancel !== null}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? This action cannot be undone."
        onConfirm={() => orderToCancel && handleResignOrder(orderToCancel)}
        onCancel={closeCancelConfirmation}
        confirmText="Yes, Cancel"
        cancelText="No, Keep It"
        isLoading={resigningOrder !== null}
      />

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

                  {order.orderStatus !== 'COMPLETED' && (
                    <div className={styles.actions}>
                      <button
                        className={styles.details}
                        onClick={() => handleOrderDetails(order.service.id)}
                      >
                        View Details
                      </button>
                      <button
                        className={styles.resign}
                        onClick={() => openCancelConfirmation(order.id)}
                        disabled={resigningOrder === order.id}
                      >
                        {resigningOrder === order.id
                          ? 'Resigning...'
                          : 'Resign'}
                      </button>
                    </div>
                  )}

                  {order.orderStatus === 'COMPLETED' && (
                    <div className={styles.actions}>
                      <button
                        className={styles.details}
                        onClick={() => handleOrderDetails(order.service.id)}
                      >
                        View Details
                      </button>
                    </div>
                  )}

                  <div
                    className={`${styles.status} ${getStatusClass(order.orderStatus)}`}
                  >
                    {order.orderStatus}
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
