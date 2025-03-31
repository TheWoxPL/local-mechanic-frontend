import styles from './AddServiceForm.module.scss';
import CloseSVG from '../../assets/svgs/close.svg';

export const AddServiceForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <img src={CloseSVG} alt="close svg" className={styles.close} />
        <form>
          <div className={styles.row}>
            <label htmlFor="title">Service title</label>
            <input type="text" id="title" placeholder="tires change etc." />
          </div>
          <div className={styles.estimatedTime}>
            <div className={styles.timeUnitArea}>
              <div className={styles.row}>
                <label htmlFor="time">Estimated time</label>
                <input type="text" id="time" placeholder="one, few, 1-2..." />
              </div>
              <div className={styles.row}>
                <label htmlFor="timeUnit">Time unit</label>
                <select name="timeUnit" id="timeUnit">
                  <option value="1">Working days</option>
                  <option value="2">Hours</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <label htmlFor="availability">Service availability</label>
            <select name="availability" id="availability">
              <option value="1">Today (day of order)</option>
              <option value="2">Tomorrow</option>
            </select>
          </div>

          <div className={styles.price}>
            <div className={styles.priceArea}>
              <div className={styles.row}>
                <label htmlFor="time">Price</label>
                <input type="text" id="time" placeholder="one, few, 1-2..." />
              </div>
              <div className={styles.row}>
                <label htmlFor="currency">Currency</label>
                <select name="currency" id="currency">
                  <option value="1">PLN</option>
                  <option value="2">EUR</option>
                </select>
              </div>

              <div className={styles.per}>per</div>

              <div className={styles.row}>
                <label htmlFor="serviceUnit">Service unit</label>
                <select name="serviceUnit" id="serviceUnit">
                  <option value="1">Working day</option>
                  <option value="2">Hour</option>
                </select>
              </div>
            </div>
          </div>
          <input type="submit" className={styles.submitButton} />
        </form>
      </div>
    </div>
  );
};
