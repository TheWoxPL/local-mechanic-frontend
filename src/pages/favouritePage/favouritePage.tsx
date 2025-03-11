import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './favouritePage.module.scss';

export const FavouritePage = () => {
  return (
    <div className={styles.container}>
      <NavigatorBar indicatorIndex={1} />
    </div>
  );
};
