import { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';

import ProductsNavBar from '../components/productsNavBar';
import CheckoutTable from '../components/checkoutTable';
import TotalPrice from '../components/totalPrice';

const ROUTE_TOTAL_PRICE = 'customer-checkout';
const TOTAL_PRICE = 'element-order-total-price';

function Checkout() {
  const [products, setProducts] = useState([]);
  const { update } = useContext(AppContext);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('Cart'));
    setProducts(cart);
  }, [update]);

  return (
    <div>
      <ProductsNavBar />
      <div>
        <h1>Finalizar Pedido</h1>
      </div>
      { products.map((product, index) => (
        <CheckoutTable key={ product.id } index={ index } product={ product } />
      ))}
      <TotalPrice datatest={ { ROUTE_TOTAL_PRICE, TOTAL_PRICE } } />
      <h3>Destalhes e Endereço da Entrega</h3>
      <form>
        <label htmlFor="venda">
          Vendedora Responsável:
          <select
            name="vendedor"
            id="vendedor"
            data-testid="customer_checkout__select-seller"
          >
            <option value="gabe">gabe</option>
            <option value="gabe">pacheco</option>
          </select>
        </label>
        <label htmlFor="endereço">
          Endereço
          <input
            type="text"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="numero">
          número
          <input
            type="number"
            data-testid="customer_checkout__input-address-number"
          />
        </label>
      </form>
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default Checkout;

// teste funcão
//  constRemove = (id) => {
//    const cart = JSON.parse(localStorage.getItem('Cart'));
//    const obj = cart.find((e) => e.id === id)
//    const index = cart.indexOf((e) => e.id === id )
//    cart[index].quantiy -= 1
//    setUpdate(update + 1)
//  }

// const remove = (removeId) => {
// const Ncart = cart.filter((item) => item.id !== removeId); <- remove todos do mesmo id
// localStorage.setItem('cartShop', json.stringFy('Ncart'))
// setCart(newCart);
//
//
//
//
//
