import { useEffect } from 'react';
import { AuthService } from '../../services/authService';
import ApiUtils from 'src/shared/api/apiUtils';
import { CreateCompanyDTO } from 'src/shared/dtos';
import { UserAuth } from 'src/context/AuthContext';

const LoginPageDev: React.FC = () => {
  const { user, loading, login, logout } = UserAuth();

  const handleAdminRoute = async () => {
    const token = await AuthService.getToken();
    if (token === null) {
      alert('Please login first');
      return;
    }
    console.log('Token admin:', token);

    try {
      const response = await fetch('http://localhost:4455/api/v1/admin-route', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.text();
      console.log('Admin Route Response:', data);
      alert(data);
    } catch (error) {
      console.error('Admin route failed:', error);
      alert('Admin route failed');
    }
  };

  const handleCustomerRoute = async () => {
    const token = await AuthService.getToken();
    if (token === null) {
      alert('Please login first');
      return;
    }
    try {
      const response = await fetch(
        'http://localhost:4455/api/v1/customer-route',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.text();
      console.log('Customer Route Response:', data);
      alert(data);
    } catch (error) {
      console.error('Customer route failed:', error);
      alert('Customer route failed');
    }
  };

  const handleEntrepreneurRoute = async () => {
    const token = await AuthService.getToken();
    if (token === null) {
      alert('Please login first');
      return;
    }
    try {
      const response = await fetch(
        'http://localhost:4455/api/v1/entrepreneur-route',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.text();
      console.log('Entrepreneur Route Response:', data);
      alert(data);
    } catch (error) {
      console.error('Entrepreneur route failed:', error);
      alert('Entrepreneur route failed');
    }
  };

  const addCustomerRole = async () => {
    const token = await AuthService.getToken();
    if (token === null) {
      alert('Please login first');
      return;
    }
    try {
      const response = await fetch(
        'http://localhost:4455/api/v1/accounts/add-customer-role',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.text();
      console.log('Customer Route Response:', data);
      alert(data);
    } catch (error) {
      console.error('Customer route failed:', error);
      alert('Customer route failed');
    }
  };

  const addEntrepreneurRole = async () => {
    const token = await AuthService.getToken();
    if (token === null) {
      alert('Please login first');
      return;
    }
    try {
      const response = await fetch(
        'http://localhost:4455/api/v1/accounts/add-entrepreneur-role',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.text();
      console.log('Response:', data);
      alert(data);
    } catch (error) {
      console.error('Route failed:', error);
      alert('Entrepreneur route failed');
    }
  };

  async function handlingApiCallVerifyToken(): Promise<void> {
    try {
      await ApiUtils.auth.verifyToken();
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetToken = async () => {
    console.log(await AuthService.getToken());
  };

  const handleAddCompany = async () => {
    const data = new CreateCompanyDTO();
    data.companyName = 'Mock Company';
    data.description = 'Mock Description';
    data.foundDate = new Date();
    data.owners = 'Mock Owner';
    data.verifiedOwners = [];
    console.log(await ApiUtils.companies.addCompany(data));
  };

  const handleGetCompanies = async () => {
    console.log(await ApiUtils.companies.getUserCompanies());
  };

  const handleGenerateServicesForUser = async () => {
    console.log(await ApiUtils.services.generateServicesForUser());
  };

  const handleContextLogin = async () => {
    await login();
  };
  const handleContextLogout = async () => {
    await logout();
  };
  const handleStaticDataVercel = async () => {
    fetch('https://nest-firebase-auth.vercel.app/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin', // Or 'include'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log('UseEffect fetching: ', await AuthService.getToken());
      console.log('Loading: ', loading);
      console.log('user', user);
    };
    fetchData();
  }, [loading, user]);

  return (
    <div>
      <button onClick={handleAdminRoute}>Test ADMIN Route</button>
      <button onClick={handleCustomerRoute}>Test customer Route</button>
      <button onClick={handleEntrepreneurRoute}>Test entrepreneur Route</button>
      <button onClick={addCustomerRole}>Add customer role</button>
      <button onClick={addEntrepreneurRole}>Add entrepreneur role</button>
      <button onClick={async () => handlingApiCallVerifyToken()}>
        ApiUtils verifyToken
      </button>
      <button onClick={handleGetToken}>Get token</button>
      <button onClick={handleAddCompany}>Add company</button>
      <button onClick={handleGetCompanies}>Get companies</button>
      <button onClick={handleGenerateServicesForUser}>Generate services</button>
      <button onClick={handleStaticDataVercel}>StaticData vercel</button>
      <br></br>
      <hr></hr>
      <button onClick={handleContextLogin}>Login</button>
      <button onClick={handleContextLogout}>Logout</button>
      <hr></hr>
      <b>User: {user ? user.email : 'logged out'}</b>
    </div>
  );
};

export default LoginPageDev;
