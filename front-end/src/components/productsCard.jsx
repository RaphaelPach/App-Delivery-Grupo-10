// import { useState } from 'react';
import PropTypes from 'prop-types';

import { useState } from 'react';

const ROUTE = 'customer_products';

const PRODUCT_PRICE = 'element-card-price-';// adiciona id no final
const PRODUCT_IMAGE = 'img-card-bg-image-';// adiciona id no final

const PRODUCT_TITLE = 'element-card-title-';// adiciona id no final
const REMOVE_PRODUCT = 'button-card-rm-item-';// adiciona id no final
const PRODUCT_QUANTITY = 'input-card-quantity-';// adiciona id no final
const ADD_PRODUCT = 'button-card-add-item-';// adiciona id no final

function ProductCard(props) {
  const [quantity, setQuantity] = useState(0);
  const { product } = props;
  const { id, name, urlImage, price } = product;

  const addItem = () => {
    setQuantity(quantity + 1);
    if (localStorage.getItem('Cart') === null) {
      localStorage.setItem('Cart', JSON.stringify([]));
    }

    const obj = JSON.parse(localStorage.getItem('Cart'));
    // obj.push({ id, urlImage, price, name });
    localStorage.setItem('Cart', JSON.stringify([...obj,
      { id, urlImage, price, name, quantity }]));
  };

  const removeItem = () => {
    if (quantity !== 0) {
      const obj = JSON.parse(localStorage.getItem('Cart'));
      console.log('-----------', obj);
      const result = obj.find((e) => e.id === id);
      console.log(result);
      result.quantity -= 1;
      console.log(result);
      localStorage.setItem('Cart', JSON.stringify(result));
      setQuantity(quantity - 1);
    }
  };
  // const handleChange = ({ target }) => {
  //   if (target.name === 'decrease' && quantity !== 0) {
  //     setQuantity(quantity - 1);
  //   }

  //   if (target.name === 'increase') {
  //     setQuantity(quantity + 1);
  //   }
  // };

  return (
    <div key={ id }>
      <div>
        <span data-testid={ `${ROUTE}__${PRODUCT_PRICE}${id}` }>
          {
            price.replace('.', ',')
          }
        </span>
        <img
          src={ urlImage }
          alt={ name }
          width="150px"
          data-testid={ `${ROUTE}__${PRODUCT_IMAGE}${id}` }
        />
      </div>
      <div>
        <span data-testid={ `${ROUTE}__${PRODUCT_TITLE}${id}` }>{ name }</span>
        <button
          type="button"
          onClick={ removeItem }
          data-testid={ `${ROUTE}__${REMOVE_PRODUCT}${id}` }
          // onClick={ handleChange }
          // name="decrease"
        >
          -
        </button>
        <input
          data-testid={ `${ROUTE}__${PRODUCT_QUANTITY}${id}` }
          type="number"
          value={ quantity }
        />
        <button
          type="button"
          name="quantity"
          onClick={ addItem }
          data-testid={ `${ROUTE}__${ADD_PRODUCT}${id}` }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
