import styles from './TopBar.module.scss';
import NotificationBellSVG from 'src/assets/svgs/notification-bell.svg';

export const TopBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.localization}>
          <span className={styles.title}>Location</span>
          <div className={styles.input}>choose</div>
        </div>
        <img src={NotificationBellSVG} alt="notification svg" />
      </div>
      <div className={styles.bottom}>
        <form>
          <input
            className={styles.search}
            id="search"
            type="text"
            placeholder="search..."
          />
          <select
            className={styles.options}
            title="options"
            name="options"
            id="options"
          >
            <option value="val1" select-name="val1">
              val1
            </option>
          </select>
        </form>
      </div>
    </div>
  );
};
