import styles from './ProfileLogged.module.scss';
import { ProfileInfo } from '../ProfileInfo/ProfileInfo';
import { MechanicInfo } from '../MechanicInfo/MechanicInfo';
import { AllCompaniesOnProfile } from '../AllCompaniesOnProfile/AllCompaniesOnProfile';
import { UserAuth } from 'src/context';
import { RoleType } from 'src/shared/enums';

export const ProfileLogged = () => {
  const { logout, roles } = UserAuth();

  if (!roles) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <ProfileInfo />
      {roles.includes(RoleType.ENTREPRENEUR) ? (
        <AllCompaniesOnProfile />
      ) : (
        <MechanicInfo />
      )}
      <button className={styles.logoutButton} onClick={logout}>
        Logout
      </button>
    </div>
  );
};
