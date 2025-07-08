import { motion } from 'framer-motion';
import styles from './CompanyOnProfile.module.scss';
import { useNavigate } from 'react-router';
import AvatarSVG from 'src/assets/svgs/avatar-mechanic.svg';
import StarSVG from 'src/assets/svgs/star.svg';

interface CompanyOnProfileProps {
  companyName: string;
  address: string;
  uuid: string;
  imageUrl?: string;
  averageRating?: number;
  opinionCount?: number;
}

export const CompanyOnProfile: React.FC<CompanyOnProfileProps> = ({
  companyName,
  address,
  uuid,
  imageUrl,
  averageRating,
  opinionCount,
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
        {averageRating && opinionCount && (
          <div className={styles.rating}>
            <span>{averageRating}</span>
            <img src={StarSVG} alt="Star" />
            <span>({opinionCount})</span>
          </div>
        )}
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
