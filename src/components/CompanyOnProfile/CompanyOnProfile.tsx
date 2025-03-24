import styles from './CompanyOnProfile.module.scss';

interface CompanyOnProfileProps {
  avatar: { src: string; alt: string };
  companyName: string;
  address: string;
}

export const CompanyOnProfile: React.FC<CompanyOnProfileProps> = ({
  avatar,
  companyName,
  address,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.mechanicAvatar}>
        <img src={avatar.src} alt={avatar.alt} />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{companyName}</span>
        <span className={styles.address}>{address}</span>
        <button
          className={styles.submitButton}
          onClick={() => console.log(companyName)}
        >
          Show details
        </button>
      </div>
    </div>
  );
};
