import { motion } from 'framer-motion';
import styles from './CompanyOnProfile.module.scss';
import { useNavigate } from 'react-router';
import AvatarSVG from 'src/assets/svgs/avatar-mechanic.svg';

interface CompanyOnProfileProps {
  companyName: string;
  address: string;
  uuid: string;
  imageUrl?: string;
}

export const CompanyOnProfile: React.FC<CompanyOnProfileProps> = ({
  companyName,
  address,
  uuid,
  imageUrl,
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
        <img
          src={imageUrl || AvatarSVG}
          alt={'Company avatar'}
          className={styles.avatarImage}
        />
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
