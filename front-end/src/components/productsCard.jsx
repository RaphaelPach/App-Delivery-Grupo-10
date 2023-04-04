import { useContext, useState } from 'react';
// import { useState } from 'react';
import PropTypes from 'prop-types';
// import { ProductProvider } from '../context/productsProvider';
import AppContext from '../context/AppContext';

const ROUTE = 'customer_products';

const PRODUCT_PRICE = 'element-card-price-';// adiciona id no final
const PRODUCT_IMAGE = 'img-card-bg-image-';// adiciona id no final

const PRODUCT_TITLE = 'element-card-title-';// adiciona id no final
const REMOVE_PRODUCT = 'button-card-rm-item-';// adiciona id no final
const PRODUCT_QUANTITY = 'input-card-quantity-';// adiciona id no final
const ADD_PRODUCT = 'button-card-add-item-';// adiciona id no final

function ProductCard(props) {
  const { teste, setTeste } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);
  const { product } = props;
  const { id, name, urlImage, price } = product;

  /* useEffect(() => {}, [quantity]); */
  const addItem = () => {
    setQuantity((previous) => previous + 1);
    if (localStorage.getItem('Cart') === null) {
      localStorage.setItem('Cart', JSON
        .stringify([{ id, urlImage, price, name, quantity: quantity + 1 }]));
      return setTeste(teste + 1);
    }
    const obj = JSON.parse(localStorage.getItem('Cart'));
    if (!obj.find((e) => e.id === id)) {
      setTeste(teste + 1);
      return localStorage.setItem('Cart', JSON
        .stringify([...obj, { id, urlImage, price, name, quantity: quantity + 1 }]));
    }
    const item = obj.find((e) => e.id === id);
    item.quantity = quantity + 1;
    const index = obj.findIndex((e) => e.id === id);
    obj[index] = item;
    localStorage.setItem('Cart', JSON.stringify(obj));
    setTeste(teste + 1);
  };

  const removeItem = () => {
    if (quantity !== 0) {
      setQuantity((previous) => previous - 1);
      if (localStorage.getItem('Cart') === null) {
        localStorage.setItem('Cart', JSON.stringify([]));
        return setTeste(teste + 1);
      }
      const obj = JSON.parse(localStorage.getItem('Cart'));
      const item = obj.find((e) => e.id === id);
      const index = obj.findIndex((e) => e.id === id);
      item.quantity = quantity - 1;

      if (item.quantity < 1) {
        const result = obj.filter((e) => e.id !== id);
        localStorage.setItem('Cart', JSON
          .stringify(result));
        return setTeste(teste + 1);
      }
      obj[index] = item;
      localStorage.setItem('Cart', JSON.stringify(obj));
      setTeste(teste + 1);
    }
  };

  // medo
  const handleChange = (event) => {
    setQuantity(Number(event.target.value));
    if (localStorage.getItem('Cart') === null
    || JSON.parse(localStorage.getItem('Cart')).length === 0) {
      localStorage.setItem('Cart', JSON.stringify([
        { id, urlImage, price, name, quantity: Number(event.target.value) }]));
      return setTeste(teste + 1);
    }

    const obj = JSON.parse(localStorage.getItem('Cart'));
    const item = obj.find((e) => e.id === id);

    if (!item) {
      localStorage.setItem('Cart', JSON.stringify([...obj,
        { id, urlImage, price, name, quantity: Number(event.target.value) }]));
      return setTeste(teste + 1);
    }
    const index = obj.findIndex((e) => e.id === id);
    item.quantity = Number(event.target.value);

    if (item.quantity < 1) {
      const result = obj.filter((e) => e.id !== id);
      localStorage.setItem('Cart', JSON
        .stringify(result));
      return setTeste(teste + 1);
    }
    obj[index] = item;
    localStorage.setItem('Cart', JSON.stringify(obj));
    setTeste(teste + 1);
  };
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
          // name="decrease"rease"
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
