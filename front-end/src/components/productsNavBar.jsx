const ROUTE = 'customer_products';
const NAV_PRODUCTS = 'element-navbar-link-products';
const NAV_ORDERS = 'element-navbar-link-orders';
const NAV_USER_FULL_NAME = 'element-navbar-user-full-name';
const NAV_LOGOUT = 'element-navbar-link-logout';

function ProductsNavBar() {
  // falta implementar as funções para a mudança de paginas e entre outros
  return (
    <nav>
      <a href="/produtos" data-testid={ `${ROUTE}__${NAV_PRODUCTS}` }>PRODUTOS</a>
      <a href="/ordems" data-testid={ `${ROUTE}__${NAV_ORDERS}` }>MEUS PEDIDOS</a>
      <a href="/nomecompleto" data-testid={ `${ROUTE}__${NAV_USER_FULL_NAME}` }>NOME</a>
      <a href="/login" data-testid={ `${ROUTE}__${NAV_LOGOUT}` }>LOGOUT</a>
    </nav>
  );
}

export default ProductsNavBar;
