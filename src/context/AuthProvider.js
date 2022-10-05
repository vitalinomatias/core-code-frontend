import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import AuthContext from './auth-context';

const AuthProvider = (props) => {
  // ======================= USE OF SET COOKIE =======================
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);
  // ==================================================================
  const [currentUser, setCurrentUser] = useState({});
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  const register = (first_name, email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/register`,
          // 'http://172.28.0.3:8500/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              first_name,
            }),
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          return resolve(data.message);
        }
        reject(data.message);
      } catch (e) {
        reject(e);
      }
    });
  };

  const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/login`,
          // 'http://172.28.0.3:8500/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        const data = await response.json();
        // ======================= SET MANUAL COOCKIE =======================
        setCookie('auth_token', data.token, {
          expires: new Date(2147483647 * 1000),
        });
        // ==================================================================
        setCurrentUser(data.data[0]);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      setCurrentUser({});
      removeCookie('auth_token');
      resolve();
    });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      if (
        Object.entries(currentUser).length === 0 &&
        cookies.auth_token &&
        cookies.auth_token !== 'undefined'
      ) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/person`,
            // 'http://172.28.0.3:8500/person',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.auth_token}`,
              },
            }
          );
          const data = await response.json();
          setCurrentUser(data.data[0]);
        } catch (error) {
          console.log(error);
        }
      }
      setLoadingUserInfo(false);
    };
    getUserInfo();
  }, []);

  const authContext = {
    currentUser,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {!loadingUserInfo && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
