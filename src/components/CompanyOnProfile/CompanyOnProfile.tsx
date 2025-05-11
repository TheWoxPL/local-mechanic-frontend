import { motion } from 'framer-motion';
import styles from './CompanyOnProfile.module.scss';
import { useNavigate } from 'react-router';

interface CompanyOnProfileProps {
  avatar: { src: string; alt: string };
  companyName: string;
  address: string;
  uuid: string;
}

export const CompanyOnProfile: React.FC<CompanyOnProfileProps> = ({
  avatar,
  companyName,
  address,
  uuid,
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1 }}
      className={styles.container}
    >
      <div className={styles.mechanicAvatar}>
        <img src={avatar.src} alt={avatar.alt} />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{companyName}</span>
        <span className={styles.address}>{address}</span>
        <button
          className={styles.submitButton}
          onClick={() => navigate(`/your-company/${uuid}`)}
        >
          Show details
        </button>
      </div>
    </motion.div>
  );
};
