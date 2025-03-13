import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './profilePage.module.scss';
import { AuthService } from 'src/services/authService';
import { LoginForm } from 'src/components/LoginForm/LoginForm';
import { LoginTopLogo } from 'src/components/LoginTopLogo/LoginTopLogo';

import { MechanicInfo } from 'src/components/MechanicInfo/MechanicInfo';
import { ProfileInfo } from 'src/components/ProfileInfo/ProfileInfo';
import { useState } from 'react';
import { ResponseTokenDTO } from 'src/shared/dtos';

export const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<ResponseTokenDTO | null>(
    AuthService.getCurrentUser()
  );
  const [isUserLogged, setIsUserLogged] = useState<boolean>(
    AuthService.isUserLogged()
  );

  const updateCurrentUser = () => {
    setCurrentUser(AuthService.getCurrentUser());
    setIsUserLogged(AuthService.isUserLogged());
  };

  const handleLogout = async () => {
    await AuthService.logout();
    updateCurrentUser();
  };
  return (
    <div className={styles.container}>
      {!isUserLogged ? (
        <>
          <LoginTopLogo />
          <LoginForm updateCurrentUser={updateCurrentUser} />
        </>
      ) : (
        <>
          <ProfileInfo currentUser={currentUser} />
          <MechanicInfo />
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </>
      )}

      <NavigatorBar indicatorIndex={3} />
    </div>
  );
};
