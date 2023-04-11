import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ROUTE = 'customer_orders';
const ORDER_ID = 'element-order-id-';
const ORDER_STATUS = 'element-delivery-status-';
const ORDER_DATE = 'element-order-date-';
const ORDER_TOTAL_PRICE = 'element-card-price-';

function OrderCard(props) {
  const history = useHistory();
  const { product } = props;
  const date = new Date(product.saleDate);
  const formatDatta = date.toLocaleDateString('pt-BR');

  return (
    <button
      type="button"
      onClick={ () => history.push(`/customer/orders/${product.id}`) }
    >
      <span
        data-testid={ `${ROUTE}__${ORDER_ID}${product.id}` }
      >
        { product.id }
      </span>
      <span
        data-testid={ `${ROUTE}__${ORDER_STATUS}${product.id}` }
      >
        { product.status }
      </span>
      <span
        data-testid={ `${ROUTE}__${ORDER_DATE}${product.id}` }
      >
        { formatDatta }
      </span>
      <span
        data-testid={ `${ROUTE}__${ORDER_TOTAL_PRICE}${product.id}` }
      >
        { product.totalPrice.replace('.', ',') }
      </span>
    </button>
  );
}

OrderCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    saleDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
