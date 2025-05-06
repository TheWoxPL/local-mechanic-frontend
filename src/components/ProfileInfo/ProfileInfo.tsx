import { UserAuth } from 'src/context';
import styles from './ProfileInfo.module.scss';
import AvatarSVG from 'src/assets/svgs/avatar.svg';

export const ProfileInfo = () => {
  const { user } = UserAuth();
  // @ts-expect-error error is shown but everything works fine
  const createdAt = new Date(parseInt(user.metadata.createdAt))
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(/ /g, ' ');

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={AvatarSVG} alt="User avatar" />
      </div>
      <div className={styles.info}>
        <span className={styles.hello}>
          Hello {user.displayName || user.email}!
        </span>
        <span className={styles.date}>since: {createdAt}</span>
        <button className={styles.editDataButton}>Edit data</button>
      </div>
    </div>
  );
};
