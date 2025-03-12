import { NavigatorBar } from 'src/components/NavigatorBar/NavigatorBar';
import styles from './profilePage.module.scss';
import { LoginForm } from 'src/components/LoginForm/LoginForm';
// import { LoginTopLogo } from 'src/components/LoginTopLogo/LoginTopLogo';
import { useContext, useEffect, useState } from 'react';
import { isUserLogged } from 'src/services/authService';
import LoginPageDev from '../loginPageDev/loginPageDev';
import { AuthContext } from 'src/context/authContext';

// import { MechanicInfo } from 'src/components/MechanicInfo/MechanicInfo';
// import { ProfileInfo } from 'src/components/ProfileInfo/ProfileInfo';

export const ProfilePage = () => {
  const { isLoggedIn, setIsLoggedIn, isUserLogged } = useContext(AuthContext);
  const [isUserLoggedState, setIsUserLoggedState] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await isUserLogged();
      console.log('Response from isUserLogged():', response);
      setIsUserLoggedState(response);
    } catch (error) {
      console.error('Error fetching user logged status:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Updated user state:', isUserLoggedState);
  }, [isUserLoggedState]);

  return (
    <div className={styles.container}>
      <LoginPageDev />
      {isLoggedIn.toString()}
      {isUserLogged === true ? <b>true</b> : <b>false</b>}
      <button onClick={() => setIsLoggedIn(true)}>Login</button>
      <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      {/* {isUserLoggedState && <p>asd</p>} */}
      {/* <LoginTopLogo /> */}
      {/* <LoginForm /> */}
      {/* <button onClick={fetchData}>Check {isUserLoggedState.toString()}</button> */}

      {/* <div className={styles.test}>{isUserLoggedState.toString()}</div> */}

      {/* <ProfileInfo />
      <MechanicInfo /> */}

      {/* <button className={styles.logoutButton}>Logout</button> */}

      <NavigatorBar indicatorIndex={3} />
    </div>
  );
};
