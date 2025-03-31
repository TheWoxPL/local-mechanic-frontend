import styles from './AddServiceForm.module.scss';
import CloseSVG from '../../assets/svgs/close.svg';
import { useState } from 'react';

interface AddServiceFormProps {
  setIsAddServiceFormVisible: (isVisible: boolean) => void;
}

export const AddServiceForm: React.FC<AddServiceFormProps> = ({
  setIsAddServiceFormVisible,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    estimatedTime: '',
    timeUnit: '',
    availability: '',
    price: '',
    currency: '',
    serviceUnit: '',
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleClose = () => {
    setIsAddServiceFormVisible(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <img
          src={CloseSVG}
          alt="close svg"
          className={styles.close}
          onClick={handleClose}
        />
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="title">Service title</label>
            <input
              type="text"
              id="title"
              placeholder="tires change etc."
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className={styles.estimatedTime}>
            <div className={styles.timeUnitArea}>
              <div className={styles.row}>
                <label htmlFor="estimatedTime">Estimated time</label>
                <input
                  type="text"
                  id="estimatedTime"
                  placeholder="one, few, 1-2..."
                  value={formData.estimatedTime}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="timeUnit">Time unit</label>
                <select
                  name="timeUnit"
                  id="timeUnit"
                  value={formData.timeUnit}
                  onChange={handleChange}
                >
                  <option value="1">Working days</option>
                  <option value="2">Hours</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <label htmlFor="availability">Service availability</label>
            <select
              name="availability"
              id="availability"
              value={formData.availability}
              onChange={handleChange}
            >
              <option value="1">Today (day of order)</option>
              <option value="2">Tomorrow</option>
            </select>
          </div>

          <div className={styles.price}>
            <div className={styles.priceArea}>
              <div className={styles.row}>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  placeholder="one, few, 1-2..."
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="currency">Currency</label>
                <select
                  name="currency"
                  id="currency"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="1">PLN</option>
                  <option value="2">EUR</option>
                </select>
              </div>

              <div className={styles.per}>per</div>

              <div className={styles.row}>
                <label htmlFor="serviceUnit">Service unit</label>
                <select
                  name="serviceUnit"
                  id="serviceUnit"
                  value={formData.serviceUnit}
                  onChange={handleChange}
                >
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
