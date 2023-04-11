import { useState, useEffect } from 'react';

const ROUTE = 'customer_products';
const NAV_ORDERS = 'element-navbar-link-orders';
const NAV_USER_FULL_NAME = 'element-navbar-user-full-name';
const NAV_LOGOUT = 'element-navbar-link-logout';

function SellerNavBar() {
  const [name, setName] = useState('Loading');
  useEffect(() => {
    const ONE_SEC = 1000;

    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user);

    const timer = setTimeout(() => setName(user.name), ONE_SEC);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const clear = () => {
    localStorage.removeItem('user');
  };

  return (
    <nav>
      <a
        href="/customer/orders"
        data-testid={ `${ROUTE}__${NAV_ORDERS}` }
      >
        PEDIDOS
      </a>
      <span
        data-testid={ `${ROUTE}__${NAV_USER_FULL_NAME}` }
      >
        { name }
      </span>
      <a
        href="/login"
        onClick={ clear }
        data-testid={ `${ROUTE}__${NAV_LOGOUT}` }
      >
        LOGOUT
      </a>
    </nav>
  );
}

export default SellerNavBar;
