import styles from './NavigatorBar.module.scss';
import HeartSVG from 'src/assets/svgs/heart.svg';
import CartSVG from 'src/assets/svgs/cart.svg';
import HomeSVG from 'src/assets/svgs/home.svg';
import ProfileSVG from 'src/assets/svgs/profile.svg';
// Import building SVG with relative path to avoid resolution issues
import GarageSVG from 'src/assets/svgs/garage.svg';
import { Link } from 'react-router';
import { UserAuth } from 'src/context';
import { RoleType } from 'src/shared/enums/role-type.enum';

interface NavigatorBarProps {
  indicatorIndex: number;
}

export const NavigatorBar: React.FC<NavigatorBarProps> = ({
  indicatorIndex,
}) => {
  const { roles } = UserAuth();
  const isEntrepreneur = roles?.includes(RoleType.ENTREPRENEUR);

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
      <Link to={isEntrepreneur ? '/your-companies' : '/favorite'}>
        <div
          className={
            indicatorIndex === 1
              ? `${styles.item} ${styles.itemActive}`
              : `${styles.item}`
          }
        >
          <img
            src={isEntrepreneur ? GarageSVG : HeartSVG}
            alt={isEntrepreneur ? 'My Companies' : 'Favorite offers'}
          />
          <span>{isEntrepreneur ? 'Companies' : 'Favorite'}</span>
        </div>
      </Link>
      <Link to={isEntrepreneur ? '/company-orders' : '/orders'}>
        <div
          className={
            indicatorIndex === 2
              ? `${styles.item} ${styles.itemActive}`
              : `${styles.item}`
          }
        >
          <img
            src={CartSVG}
            alt={isEntrepreneur ? 'Incoming Orders' : 'Orders'}
          />
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
