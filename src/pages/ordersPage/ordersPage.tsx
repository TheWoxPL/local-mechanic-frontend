import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './ordersPage.module.scss';

export const OrdersPage = () => {
  return (
    <div className={styles.container}>
      <NavigatorBar indicatorIndex={2} />
    </div>
  );
};
