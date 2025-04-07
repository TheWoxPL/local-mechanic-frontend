import styles from './NavigatorBar.module.scss';
import HeartSVG from 'src/assets/svgs/heart.svg';
import CartSVG from 'src/assets/svgs/cart.svg';
import HomeSVG from 'src/assets/svgs/home.svg';
import ProfileSVG from 'src/assets/svgs/profile.svg';
import { Link } from 'react-router';

interface NavigatorBarProps {
  indicatorIndex: number;
}

export const NavigatorBar: React.FC<NavigatorBarProps> = ({
  indicatorIndex,
}) => {
  return (
    <div className={styles.container}>
      <Link to={'/home'}>
        <div
          className={
            indicatorIndex === 0
              ? `${styles.item} ${styles.itemActive}`
              : `${styles.item}`
          }
        >
          <img src={HomeSVG} alt="Home Page" />
          <span>Home</span>
        </div>
      </Link>
      <Link to={'/favorite'}>
        <div
          className={
            indicatorIndex === 1
              ? `${styles.item} ${styles.itemActive}`
              : `${styles.item}`
          }
        >
          <img src={HeartSVG} alt="Favorite offers" />
          <span>Favorite</span>
        </div>
      </Link>
      <Link to={'/orders'}>
        <div
          className={
            indicatorIndex === 2
              ? `${styles.item} ${styles.itemActive}`
              : `${styles.item}`
          }
        >
          <img src={CartSVG} alt="Orders" />
          <span>Orders</span>
        </div>
      </Link>
      <Link to={'/profile'}>
        <div
          className={
            indicatorIndex === 3
              ? `${styles.item} ${styles.itemActive}`
              : `${styles.item}`
          }
        >
          <img src={ProfileSVG} alt="Profile" />
          <span>Profile</span>
        </div>
      </Link>
    </div>
  );
};
