import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './profilePage.module.scss';

export const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <NavigatorBar indicatorIndex={3} />
    </div>
  );
};
