import styles from './NavigatorBar.module.scss';
import HeartSVG from 'src/assets/svgs/heart.svg';
import CartSVG from 'src/assets/svgs/cart.svg';
import HomeSVG from 'src/assets/svgs/home.svg';
import ProfileSVG from 'src/assets/svgs/profile.svg';

export const NavigatorBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img src={HomeSVG} alt="Home Page" />
        <span>Home</span>
      </div>
      <div className={styles.item}>
        <img src={HeartSVG} alt="Favourite offers" />
        <span>Favourite</span>
      </div>
      <div className={styles.item}>
        <img src={CartSVG} alt="Orders" />
        <span>Orders</span>
      </div>
      <div className={styles.item}>
        <img src={ProfileSVG} alt="Profile" />
        <span>Profile</span>
      </div>
    </div>
  );
};
