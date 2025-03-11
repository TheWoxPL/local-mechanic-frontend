import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './homePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <NavigatorBar indicatorIndex={0} />
    </div>
  );
};
