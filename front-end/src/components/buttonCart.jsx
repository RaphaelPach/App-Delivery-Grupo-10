import { useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';

const ROUTE = 'customer_products';

const BUTTON_CART = 'button-cart';
const CHECKOUT_BOTTOM_VALUE = 'checkout-bottom-value';

function ButtonCart() {
  const history = useHistory();
  const { teste } = useContext(AppContext);
  const [price, setPrice] = useState(0.00);
  useEffect(() => {
    const calculation = () => {
      if (localStorage.getItem('Cart') === null
        || (JSON.parse(localStorage.getItem('Cart'))).length === 0) {
        return setPrice(0.00);
      }
      let result = 0.00;
      const obj = JSON.parse(localStorage.getItem('Cart'));
      console.log(obj);
      obj.forEach((e) => {
        const a = Number(e.price) * Number(e.quantity);
        result += a;
      });
      return setPrice(result);
    };
    calculation();
  }, [teste]);

  function handleClick() {
    history.push('/customer/checkout');
  }

  function isDisabled() {
    return !price;
  }

  return (
    <button
      type="button"
      data-testid={ `${ROUTE}__${BUTTON_CART}` }
      disabled={ isDisabled() }
      onClick={ handleClick }
    >
      <span data-testid={ `${ROUTE}__${CHECKOUT_BOTTOM_VALUE}` }>
        { price?.toFixed(2).replace('.', ',')}
      </span>
    </button>
  );
}

export default ButtonCart;
