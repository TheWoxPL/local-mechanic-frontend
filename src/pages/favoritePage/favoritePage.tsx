import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './favoritePage.module.scss';

export const FavoritePage = () => {
  return (
    <div className={styles.container}>
      <NavigatorBar indicatorIndex={1} />
    </div>
  );
};
