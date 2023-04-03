import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import loginHTTP from '../Helpers/axios';

const ROUTE = 'customer_products';

const PRODUCT_PRICE = 'element-card-price-';// adiciona id no final
const PRODUCT_IMAGE = 'img-card-bg-image-';// adiciona id no final

const PRODUCT_TITLE = 'element-card-title-';// adiciona id no final
const REMOVE_PRODUCT = 'button-card-rm-item-';// adiciona id no final
const PRODUCT_QUANTITY = 'input-card-quantity-';// adiciona id no final
const ADD_PRODUCT = 'button-card-add-item-';// adiciona id no final

// const CART_BUTTON = 'button-cart';
// const CART_VALUE = 'checkout-bottom-value';

function ProductCard() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const ONE_SEC = 1000;

    const getProducts = async () => {
      if (JSON.parse(localStorage.getItem('user')) === null) {
        localStorage.setItem('user', JSON.stringify({ token: '' }));
      }
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await loginHTTP({
          method: 'get', url: '/customer/products', token: user.token });
        setProducts(response.data);
      } catch (error) {
        localStorage.removeItem('user');
        history.push('/');
        return new Error();
      }
    };

    getProducts();

    const timer = setTimeout(() => setLoading(false), ONE_SEC);

    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  const addItem = (id) => {
    const input = document.getElementById(`${ROUTE}__${PRODUCT_QUANTITY}${id}`);
    input.value = Number(input.value) + 1;
  };

  const removeItem = (id) => {
    const input = document.getElementById(`${ROUTE}__${PRODUCT_QUANTITY}${id}`);
    if (input.value !== '0') {
      input.value = Number(input.value) - 1;
    }
  };

  return (isLoading ? <span>Loading</span> : products.map((e) => (
    <div key={ e.id }>
      <div>
        <span data-testid={ `${ROUTE}__${PRODUCT_PRICE}${e.id}` }>
          {
            e.price.replace('.', ',')
          }
        </span>
        <img
          src={ e.urlImage }
          alt={ e.name }
          width="150px"
          data-testid={ `${ROUTE}__${PRODUCT_IMAGE}${e.id}` }
        />
      </div>
      <div>
        <span data-testid={ `${ROUTE}__${PRODUCT_TITLE}${e.id}` }>{ e.name }</span>
        <button
          type="button"
          onClick={ () => removeItem(e.id) }
          data-testid={ `${ROUTE}__${REMOVE_PRODUCT}${e.id}` }
        >
          -
        </button>
        <input
          id={ `${ROUTE}__${PRODUCT_QUANTITY}${e.id}` }
          data-testid={ `${ROUTE}__${PRODUCT_QUANTITY}${e.id}` }
          type="number"
          value={ 0 }
        />
        <button
          type="button"
          onClick={ () => addItem(e.id) }
          data-testid={ `${ROUTE}__${ADD_PRODUCT}${e.id}` }
        >
          +
        </button>
      </div>
    </div>
  )));
}

export default ProductCard;
