import { useEffect, useState, useRef } from 'react';
import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './companyOrdersPage.module.scss';
import { OrderDto } from 'src/shared/dtos/order.dto';
import { useNavigate } from 'react-router';
import Spinner from 'src/components/Spinner/Spinner';
import { ConfirmationModal } from 'src/components/ConfirmationModal/ConfirmationModal';
import { UserAuth } from 'src/context';
import { RoleType } from 'src/shared/enums/role-type.enum';
import { CompanyDTO } from 'src/shared/dtos';

type ViewMode = 'pending' | 'confirmed' | 'rejected' | 'completed';

const formatDate = (
  dateString: string | Date
): { day: string; monthYear: string; time: string } => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return {
    day,
    monthYear: `${month} ${year}`,
    time: `${hours}:${minutes}`,
  };
};

export const CompanyOrdersPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [userCompanies, setUserCompanies] = useState<CompanyDTO[]>([]);
  const [activeCompanyId, setActiveCompanyId] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('pending');
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'confirm' | 'reject' | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [processingOrder, setProcessingOrder] = useState<string | null>(null);

  const { roles } = UserAuth();
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roles?.includes(RoleType.ENTREPRENEUR)) {
      navigate('/orders');
      return;
    }

    const fetchUserCompanies = async () => {
      try {
        // TODO: implement fetching data from backend
        const companies = [];
        setUserCompanies(companies);
      } catch (error) {
        console.error('Error fetching user companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCompanies();
  }, [roles, navigate]);

  useEffect(() => {
    const fetchCompanyOrders = async () => {
      setLoading(true);
      try {
        // TODO: implement fetching data from backend
        setOrders([]);
      } catch (error) {
        console.error('Error fetching company orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyOrders();
  }, [activeCompanyId]);

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

  const handleCompanyChange = (companyId: string) => {
    setActiveCompanyId(companyId);
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
        if (viewMode === 'pending') switchTab('confirmed');
        else if (viewMode === 'confirmed') switchTab('rejected');
        else if (viewMode === 'rejected') switchTab('completed');
      } else {
        if (viewMode === 'completed') switchTab('rejected');
        else if (viewMode === 'rejected') switchTab('confirmed');
        else if (viewMode === 'confirmed') switchTab('pending');
      }
    }

    touchStartX.current = null;
  };

  const handleOrderAction = (orderId: string, action: 'confirm' | 'reject') => {
    setSelectedOrderId(orderId);
    setActionType(action);
  };

  const closeActionModal = () => {
    setSelectedOrderId(null);
    setActionType(null);
  };

  const confirmOrderAction = async () => {
    // TODO: implement order confirmation/rejection logic
    return;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner />
        <NavigatorBar indicatorIndex={2} />
      </div>
    );
  }

  const filteredOrders = orders.filter((order) => {
    if (viewMode === 'pending') return order.orderStatus === 'PENDING';
    if (viewMode === 'confirmed') return order.orderStatus === 'CONFIRMED';
    if (viewMode === 'rejected') return order.orderStatus === 'REJECTED';
    if (viewMode === 'completed') return order.orderStatus === 'COMPLETED';
    return false;
  });

  const getServiceInitial = (title: string): string => {
    return title.charAt(0).toUpperCase();
  };

  const renderEmptyState = () => {
    const messages = {
      pending: 'No new orders waiting for your confirmation.',
      confirmed: "You don't have any confirmed orders yet.",
      rejected: "You don't have any rejected orders yet.",
      completed: "You don't have any completed orders yet.",
    };

    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <h3>No orders found</h3>
        <p>{messages[viewMode]}</p>
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
      <ConfirmationModal
        isOpen={selectedOrderId !== null}
        title={actionType === 'confirm' ? 'Confirm Order' : 'Reject Order'}
        message={
          actionType === 'confirm'
            ? 'Are you sure you want to confirm this order? The customer will be notified.'
            : 'Are you sure you want to reject this order? This action cannot be undone.'
        }
        onConfirm={confirmOrderAction}
        onCancel={closeActionModal}
        confirmText={actionType === 'confirm' ? 'Yes, Confirm' : 'Yes, Reject'}
        cancelText="Cancel"
        isLoading={processingOrder !== null}
      />

      <div className={styles.header}>
        <h1>Company orders</h1>
      </div>
      <div className={styles.tabs}>
        <button
          className={viewMode === 'pending' ? styles.activeTab : ''}
          onClick={() => switchTab('pending')}
        >
          Pending
        </button>
        <button
          className={viewMode === 'confirmed' ? styles.activeTab : ''}
          onClick={() => switchTab('confirmed')}
        >
          Confirmed
        </button>
        <button
          className={viewMode === 'rejected' ? styles.activeTab : ''}
          onClick={() => switchTab('rejected')}
        >
          Rejected
        </button>
        <button
          className={viewMode === 'completed' ? styles.activeTab : ''}
          onClick={() => switchTab('completed')}
        >
          Completed
        </button>
      </div>

      <div className={styles.companySelector}>
        <label>Select Company:</label>
        <select
          title="active_company"
          value={activeCompanyId}
          onChange={(e) => handleCompanyChange(e.target.value)}
        >
          <option value="all">All Companies</option>
          {userCompanies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.companyName}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.ordersContainer}>
        {filteredOrders.length > 0
          ? filteredOrders.map((order) => {
              const { day, monthYear, time } = formatDate(order.scheduledDate);

              return (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div className={styles.serviceInitial}>
                      {getServiceInitial(order.serviceName)}
                    </div>
                    <div className={styles.orderDetails}>
                      <h3 className={styles.serviceName}>
                        {order.serviceName}
                      </h3>
                      <p className={styles.customerName}>
                        Customer: {order.customerName || 'Anonymous'}
                      </p>
                    </div>
                  </div>

                  <div className={styles.orderDate}>
                    <div className={styles.dateInfo}>
                      <div className={styles.day}>{day}</div>
                      <div className={styles.monthYear}>{monthYear}</div>
                    </div>
                    <div className={styles.time}>{time}</div>
                  </div>

                  {viewMode === 'pending' && (
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.confirmButton}
                        onClick={() => handleOrderAction(order.id, 'confirm')}
                      >
                        Confirm
                      </button>
                      <button
                        className={styles.rejectButton}
                        onClick={() => handleOrderAction(order.id, 'reject')}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          : renderEmptyState()}
      </div>

      <NavigatorBar indicatorIndex={2} />
    </div>
  );
};
