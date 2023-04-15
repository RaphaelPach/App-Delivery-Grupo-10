import { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

const ROUTE = 'customer_checkout';

const TABLE_INDEX = 'element-order-table-item-number-';
const TABLE_PRODUCT_NAME = 'element-order-table-name-';
const TABLE_PRODUCT_QUANTITY = 'element-order-table-quantity-';
const TABLE_PRODUCT_PRICE = 'element-order-table-unit-price-';
const TABLE_TOTAL = 'element-order-table-sub-total-';
const TABLE_REMOVE = 'element-order-table-remove-';
// const TABLE_INDEX = 'element-order-table-item-number-';

function CheckoutTable(props) {
  const { update, setUpdate } = useContext(AppContext);
  const { index } = props;
  const { product } = props;
  const { id, name, quantity, price } = product;

  const obj = JSON.parse(localStorage.getItem('Cart'));

  const removeItem = () => {
    const newArray = obj.filter((e) => e.id !== id);
    localStorage.setItem('Cart', JSON.stringify(newArray));
    setUpdate(update + 1);
  };

  return (
    <tr>
      <td data-testid={ `${ROUTE}__${TABLE_INDEX}${index}` }>{ index + 1 }</td>
      <td data-testid={ `${ROUTE}__${TABLE_PRODUCT_NAME}${index}` }>{ name }</td>
      <td
        data-testid={ `${ROUTE}__${TABLE_PRODUCT_QUANTITY}${index}` }
      >
        { Number(quantity) }
      </td>
      <td
        data-testid={ `${ROUTE}__${TABLE_PRODUCT_PRICE}${index}` }
      >
        { price.replace('.', ',') }
      </td>
      <td
        data-testid={ `${ROUTE}__${TABLE_TOTAL}${index}` }
      >
        { (Number(quantity) * Number(price)).toFixed(2).replace('.', ',') }
      </td>
      <button
        onClick={ removeItem }
        data-testid={ `${ROUTE}__${TABLE_REMOVE}${index}` }
        type="button"
      >
        REMOVE
      </button>
    </tr>
  );
}

CheckoutTable.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CheckoutTable;
