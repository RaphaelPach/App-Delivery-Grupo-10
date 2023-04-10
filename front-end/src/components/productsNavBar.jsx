import { useState, useEffect } from 'react';

const ROUTE = 'customer_products';
const NAV_PRODUCTS = 'element-navbar-link-products';
const NAV_ORDERS = 'element-navbar-link-orders';
const NAV_USER_FULL_NAME = 'element-navbar-user-full-name';
const NAV_LOGOUT = 'element-navbar-link-logout';

function ProductsNavBar() {
  const [name, setName] = useState('Loading');
  // falta implementar as funções para a mudança de paginas e entre outros
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
      <a href="/produtos" data-testid={ `${ROUTE}__${NAV_PRODUCTS}` }>PRODUTOS</a>
      <a
        href="/customer/orders"
        data-testid={ `${ROUTE}__${NAV_ORDERS}` }
      >
        MEUS PEDIDOS
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

export default ProductsNavBar;
