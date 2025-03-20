import { YourCompanyTopInfo } from 'src/components/YourCompanyTopInfo/YourCompanyTopInfo';
import styles from './yourCompanyPage.module.scss';

export const YourCompanyPage = () => {
  return (
    <div className={styles.container}>
      <YourCompanyTopInfo />
    </div>
  );
};
