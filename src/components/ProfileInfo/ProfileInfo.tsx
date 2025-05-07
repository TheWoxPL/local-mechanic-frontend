import { UserAuth } from 'src/context';
import styles from './ProfileInfo.module.scss';
import AvatarSVG from 'src/assets/svgs/avatar.svg';

export const ProfileInfo = () => {
  const { user, logout } = UserAuth();
  // TypeScript may show an error here, but everything works fine in runtime.
  const createdAt = new Date(
    parseInt((user.metadata as { createdAt: string }).createdAt)
  )
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
        <div className={styles.buttonsArea}>
          <button className={styles.editDataButton}>Edit data</button>
          <button className={styles.logoutButton} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
