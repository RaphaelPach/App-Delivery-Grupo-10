import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ROUTE = 'seller_orders';

const ORDER_ID = 'element-order-id-';
const ORDER_STATUS = 'element-delivery-status-';
const ORDER_DATE = 'element-order-date-';
const ORDER_TOTAL_PRICE = 'element-card-price-';
const ORDER_ADDRESS = 'element-card-address-';

function SellerOrderButton(props) {
  const history = useHistory();
  const { product } = props;

  return (
    <button type="button" onClick={ () => history.push(`/seller/orders/${product.id}`) }>
      <span data-testid={ `${ROUTE}__${ORDER_ID}${product.id}` }>
        { product.id }
      </span>
      <span data-testid={ `${ROUTE}__${ORDER_STATUS}${product.id}` }>
        { product.status }
      </span>
      <span data-testid={ `${ROUTE}__${ORDER_DATE}${product.id}` }>
        { product.saleDate }
      </span>
      <span data-testid={ `${ROUTE}__${ORDER_TOTAL_PRICE}${product.id}` }>
        { product.totalPrice.replace('.', ',') }
      </span>
      <span data-testid={ `${ROUTE}__${ORDER_ADDRESS}${product.id}` }>
        { product.deliveryAddress }
      </span>
    </button>
  );
}

SellerOrderButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    saleDate: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
  }).isRequired,
};

export default SellerOrderButton;
