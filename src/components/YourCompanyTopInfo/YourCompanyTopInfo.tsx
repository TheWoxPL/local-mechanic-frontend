import styles from './YourCompanyTopInfo.module.scss';
import AvatarSVG from 'src/assets/svgs/avatar-mechanic.svg';

export const YourCompanyTopInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <img src={AvatarSVG} alt="Avatar" />
        </div>
        <div className={styles.infoDetails}>
          <span className={styles.companyName}>Company name inc.</span>
          <span>st. długa 12a, cracow</span>
          <span>12.12.2001</span>
          <span>Services: 21</span>
        </div>
        <div className={styles.editSide}>
          <button>Edit</button>
        </div>
      </div>
      <div className={styles.owners}>
        <span>owners: </span>
        <div className={`${styles.oneOwner} ${styles.oneOwnerCreator}`}>Me</div>
        <div className={styles.oneOwner}>John Doe</div>
      </div>
      <div className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque laborum
        nemo itaque unde maxime possimus mollitia rem sit voluptate saepe
        molestiae amet incidunt eveniet fugiat totam, sapiente ab ullam dolorum.
      </div>
    </div>
  );
};
