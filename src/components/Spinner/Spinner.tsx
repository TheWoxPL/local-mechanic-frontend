import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.spinner}></div>
        <div className={styles.spinnerPing}></div>
      </div>
    </div>
  );
};

export default Spinner;
