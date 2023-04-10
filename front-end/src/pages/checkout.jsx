import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

import ProductsNavBar from '../components/productsNavBar';
import CheckoutTable from '../components/checkoutTable';
import TotalPrice from '../components/totalPrice';
import { loginHTTP } from '../Helpers/axios';

const ROUTE_TOTAL_PRICE = 'customer-checkout';
const TOTAL_PRICE = 'element-order-total-price';

function Checkout() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [sellerId, setSellerId] = useState(2);
  const [totalPrice, setTotalPrice] = useState(0.00);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState(0);

  const { update } = useContext(AppContext);

  const calculation = () => {
    if (localStorage.getItem('Cart') === null
      || (JSON.parse(localStorage.getItem('Cart'))).length === 0) {
      return setTotalPrice(0.00);
    }
    let result = 0.00;
    const obj = JSON.parse(localStorage.getItem('Cart'));
    obj.forEach((e) => {
      const a = Number(e.price) * Number(e.quantity);
      result += a;
    });
    return setTotalPrice(result);
  };

  const getSellers = async () => {
    const response = await loginHTTP({
      method: 'GET', url: '/sellers' });
    setSellers(response.data);
  };

  const getCustomers = async () => {
    const response = await loginHTTP({
      method: 'GET', url: '/customers' });
    setCustomers(response.data);
  };

  useEffect(() => {
    const ONE_SEC = 1000;
    getSellers();
    getCustomers();
    calculation();

    const cart = JSON.parse(localStorage.getItem('Cart'));
    setProducts(cart);

    const timer = setTimeout(() => setLoading(false), ONE_SEC);

    return () => {
      clearTimeout(timer);
    };
  }, [update]);

  const finishOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const rightUser = customers.find((e) => e.name === user.name);

      console.log(user.token);

      const response = await loginHTTP({
        method: 'POST',
        url: '/newSale',
        body: {
          userId: rightUser.id,
          sellerId,
          totalPrice,
          deliveryAddress,
          deliveryNumber,
          products,
        },
        token: user.token });

      return history.push(`/customer/orders/${response.data.id}`);
    } catch (error) {
      return new Error();
    }
  };

  return (
    loading ? <p>Loading</p> : (
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
          <label htmlFor="seller">
            Vendedora Responsável:
            <select
              value={ sellerId }
              onClick={ (e) => setSellerId(e.target.value) }
              id="seller"
              data-testid="customer_checkout__select-seller"
            >
              { sellers.map((e) => (
                <option key={ e.id } value={ e.id }>{ e.name }</option>
              ))}
            </select>
          </label>
          <label htmlFor="address">
            Endereço
            <input
              onChange={ (e) => setDeliveryAddress(e.target.value) }
              id="address"
              type="text"
              data-testid="customer_checkout__input-address"
            />
          </label>
          <label htmlFor="addressNumber">
            número
            <input
              onChange={ (e) => setDeliveryNumber(Number(e.target.value)) }
              id="addressNumber"
              type="number"
              data-testid="customer_checkout__input-address-number"
            />
          </label>
        </form>
        <button
          onClick={ finishOrder }
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </div>
    )
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
