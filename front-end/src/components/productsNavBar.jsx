import { AppBar, Box, Link, Toolbar } from '@mui/material';
import { useState, useEffect } from 'react';

const ROUTE = 'customer_products';
const NAV_PRODUCTS = 'element-navbar-link-products';
const NAV_ORDERS = 'element-navbar-link-orders';
const NAV_USER_FULL_NAME = 'element-navbar-user-full-name';
const NAV_LOGOUT = 'element-navbar-link-logout';

const pixel = 'solid black 2px';

function ProductsNavBar() {
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
    <Box sx={ { flexGrow: 1 } }>
      <AppBar position="static">
        <Toolbar sx={ { display: 'flex', justifyContent: 'space-around' } }>
          <Link
            href="/produtos"
            sx={ { border: pixel,
              borderRadius: '5px',
              color: 'black',
              padding: '7px',
              textDecoration: 'none' } }
            data-testid={ `${ROUTE}__${NAV_PRODUCTS}` }
          >
            PRODUTOS

          </Link>
          <Link
            href="/customer/orders"
            sx={ { border: pixel,
              borderRadius: '5px',
              color: 'black',
              padding: '7px',
              textDecoration: 'none' } }
            data-testid={ `${ROUTE}__${NAV_ORDERS}` }
          >
            MEUS PEDIDOS
          </Link>
          <span
            data-testid={ `${ROUTE}__${NAV_USER_FULL_NAME}` }
          >
            { name }
          </span>
          <Link
            href="/login"
            sx={ { border: pixel,
              borderRadius: '5px',
              color: 'black',
              padding: '7px',
              textDecoration: 'none',
            } }
            onClick={ clear }
            data-testid={ `${ROUTE}__${NAV_LOGOUT}` }
          >
            LOGOUT
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ProductsNavBar;
