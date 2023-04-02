import { useState, useEffect } from 'react';
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
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getProducts = async () => {
    const response = await loginHTTP({ method: 'get', url: '/customer/products' });
    console.log(response.data.urlImage);
    setProducts(response.data);
  };

  useEffect(() => {
    const ONE_SEC = 1000;

    getProducts();

    const timer = setTimeout(() => setLoading(false), ONE_SEC);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
          data-testid={ `${ROUTE}__${PRODUCT_IMAGE}${e.id}` }
        />
      </div>
      <div>
        <span data-testid={ `${ROUTE}__${PRODUCT_TITLE}${e.id}` }>{ e.name }</span>
        <button
          type="button"
          data-testid={ `${ROUTE}__${REMOVE_PRODUCT}${e.id}` }
        >
          -
        </button>
        <input data-testid={ `${ROUTE}__${PRODUCT_QUANTITY}${e.id}` } type="number" />
        <button
          type="button"
          data-testid={ `${ROUTE}__${ADD_PRODUCT}${e.id}` }
        >
          +
        </button>
      </div>
    </div>
  )));
}

export default ProductCard;
