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
    setQuantity((previous) => previous + 1);
    if (localStorage.getItem('Cart') === null) {
      localStorage.setItem('totalPrice', price);
      return localStorage.setItem('Cart', JSON
        .stringify([{ id, urlImage, price, name, quantity: quantity + 1 }]));
    }
    const preco = JSON.parse(localStorage.getItem('totalPrice'));
    const obj = JSON.parse(localStorage.getItem('Cart'));
    if (!obj.find((e) => e.id === id)) {
      const a = Number(preco) + Number(price);
      localStorage.setItem('totalPrice', a);
      return localStorage.setItem('Cart', JSON
        .stringify([...obj, { id, urlImage, price, name, quantity }]));
    }
    const item = obj.find((e) => e.id === id);
    item.quantity = quantity + 1;
    const index = obj.findIndex((e) => e.id === id);
    obj[index] = item;

    const a = Number(preco) + Number(price);
    localStorage.setItem('totalPrice', a);
    localStorage.setItem('Cart', JSON.stringify(obj));
  };

  const removeItem = () => {
    if (quantity !== 0) {
      setQuantity((previous) => previous - 1);
      if (localStorage.getItem('Cart') === null) {
        localStorage.setItem('totalPrice', 0.00);
        return localStorage.setItem('Cart', JSON
          .stringify([]));
      }
      const preco = JSON.parse(localStorage.getItem('totalPrice'));
      const obj = JSON.parse(localStorage.getItem('Cart'));
      const item = obj.find((e) => e.id === id);
      const index = obj.findIndex((e) => e.id === id);
      item.quantity = quantity - 1;
      const a = Number(preco) - Number(price);
      localStorage.setItem('totalPrice', a);

      if (item.quantity < 1) {
        const result = obj.filter((e) => e.id !== id);
        return localStorage.setItem('Cart', JSON
          .stringify(result));
      }
      obj[index] = item;
      localStorage.setItem('Cart', JSON.stringify(obj));
    }
  };

  // medo
  const handleChange = (event) => {
    setQuantity(Number(event.target.value));
    const preco = JSON.parse(localStorage.getItem('totalPrice'));
    if (localStorage.getItem('Cart') === null
    || JSON.parse(localStorage.getItem('Cart')).length === 0) {
      return localStorage.setItem('Cart', JSON.stringify([
        { id, urlImage, price, name, quantity: Number(event.target.value) }]));
    }

    if (Number(event.target.value) > quantity) {
      // ADICIONA
      const a = Number(price) * Number(event.target.value);
      localStorage.setItem('totalPrice', Number(preco) + a);
    }

    if (Number(event.target.value) < quantity) {
      // REMOVE
      const a = Number(price) * Number(event.target.value);
      localStorage.setItem('totalPrice', Number(-preco) + a);
    }

    const obj = JSON.parse(localStorage.getItem('Cart'));
    const item = obj.find((e) => e.id === id);

    if (!item) {
      return localStorage.setItem('Cart', JSON.stringify([...obj,
        { id, urlImage, price, name, quantity: Number(event.target.value) }]));
    }
    const index = obj.findIndex((e) => e.id === id);
    item.quantity = Number(event.target.value);

    if (item.quantity < 1) {
      const result = obj.filter((e) => e.id !== id);
      return localStorage.setItem('Cart', JSON
        .stringify(result));
    }

    obj[index] = item;
    localStorage.setItem('Cart', JSON.stringify(obj));
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
          onChange={ handleChange }
          data-testid={ `${ROUTE}__${PRODUCT_QUANTITY}${id}` }
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
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
