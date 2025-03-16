import styles from './RegisterCompanyForm.module.scss';

export const RegisterCompanyForm = () => {
  return (
    <div className={styles.container}>
      <form>
        <div className={styles.inputField}>
          <label>Company name</label>
          <input type="text" placeholder="your company inc." />
        </div>
        <div className={styles.inputField}>
          <label>Found date</label>
          <input type="text" placeholder="ex. 12.12.2012" />
        </div>
        <div className={styles.ownersField}>
          <label>Owners:</label>
          <div className={styles.owners}>
            <div className={styles.oneOwner}>Me</div>
          </div>
        </div>
        <div className={styles.inputField}>
          <label>Description</label>
          <textarea
            className={styles.descriptionTextArea}
            title="description"
            placeholder="type some information about your company..."
          ></textarea>
        </div>
        <div className={styles.inputField}>
          <label>Localization</label>
          <input type="text" placeholder="cracow st. długa 12a" />
        </div>
        <input type="submit" className={styles.submitButton} />
      </form>
    </div>
  );
};
