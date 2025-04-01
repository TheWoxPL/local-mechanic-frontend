import styles from './AddServiceForm.module.scss';
import CloseSVG from '../../assets/svgs/close.svg';
import { useEffect, useState } from 'react';
import ApiUtils from 'src/shared/api/apiUtils';
import {
  CurrencyDTO,
  ServiceAvailabilityDTO,
  ServiceUnitDTO,
  TimeUnitDTO,
} from 'src/shared/dtos';

interface AddServiceFormProps {
  setIsAddServiceFormVisible: (isVisible: boolean) => void;
}

export const AddServiceForm: React.FC<AddServiceFormProps> = ({
  setIsAddServiceFormVisible,
}) => {
  const [isFetching, setIsFetching] = useState(true);
  const [currencies, setCurrencies] = useState<CurrencyDTO[]>([]);
  const [serviceUnits, setServiceUnits] = useState<ServiceUnitDTO[]>([]);
  const [timeUnits, setTimeUnits] = useState<TimeUnitDTO[]>([]);
  const [serviceAvailabilities, setServiceAvailabilities] = useState<
    ServiceAvailabilityDTO[]
  >([]);
  const [formData, setFormData] = useState({
    title: '',
    estimatedTime: '',
    timeUnit: '',
    availability: '',
    price: '',
    currency: '',
    serviceUnit: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCurrencies = await ApiUtils.staticData.getCurrencies();
        const fetchedServiceUnits = await ApiUtils.staticData.getServiceUnits();
        const fetchedServiceAvailabilities =
          await ApiUtils.staticData.getServiceAvailabilities();
        const fetchedTimeUnits = await ApiUtils.staticData.getTimeUnits();
        setServiceUnits(fetchedServiceUnits);
        setCurrencies(fetchedCurrencies);
        setServiceAvailabilities(fetchedServiceAvailabilities);
        setTimeUnits(fetchedTimeUnits);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);

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
  };

  const handleClose = () => {
    setIsAddServiceFormVisible(false);
  };

  if (isFetching) {
    return <div></div>;
  }

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
                  {timeUnits.map((timeUnit) => {
                    return (
                      <option key={timeUnit.id} value={timeUnit.id}>
                        {timeUnit.name}
                      </option>
                    );
                  })}
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
              {serviceAvailabilities.map((serviceAvailability) => {
                return (
                  <option
                    key={serviceAvailability.id}
                    value={serviceAvailability.id}
                  >
                    {serviceAvailability.name}
                  </option>
                );
              })}
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
                  {currencies.map((currency) => {
                    return (
                      <option key={currency.id} value={currency.id}>
                        {currency.name}
                      </option>
                    );
                  })}
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
                  {serviceUnits.map((unit) => {
                    return (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    );
                  })}
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
