import { getToken, googleLogin, logout } from '../../services/authService';

const LoginPageDev: React.FC = () => {
  const handleAdminRoute = async () => {
    const token = await getToken();
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
    const token = await getToken();
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
        },
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
    const token = await getToken();
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
        },
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
    const token = await getToken();
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
        },
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
    const token = await getToken();
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
        },
      );
      const data = await response.text();
      console.log('Response:', data);
      alert(data);
    } catch (error) {
      console.error('Route failed:', error);
      alert('Entrepreneur route failed');
    }
  };

  return (
    <div>
      <button onClick={googleLogin}>Login with Google</button>
      <button onClick={handleAdminRoute}>Test ADMIN Route</button>
      <button onClick={handleCustomerRoute}>Test customer Route</button>
      <button onClick={handleEntrepreneurRoute}>Test entrepreneur Route</button>
      <button onClick={logout}>Logout</button>
      <button onClick={addCustomerRole}>Add customer role</button>
      <button onClick={addEntrepreneurRole}>Add entrepreneur role</button>
    </div>
  );
};

export default LoginPageDev;