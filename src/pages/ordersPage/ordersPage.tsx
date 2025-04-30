import { useEffect, useState } from 'react';
import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './ordersPage.module.scss';
import ApiUtils from 'src/shared/api/apiUtils';
import { OrderDto } from 'src/shared/dtos/order.dto';

export const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await ApiUtils.orders.getUserOrders();
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={styles.container}>
      <NavigatorBar indicatorIndex={2} />
      <div className={styles.ordersList}>
        {orders.map((order, index) => (
          <div key={index} className={styles.orderItem}>
            <p>Order ID: {order.id}</p>
            <p>Service name: {order.service.title}</p>
            <p>Order Total: {order.userId}</p>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};
