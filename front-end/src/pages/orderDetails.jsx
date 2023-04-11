import DetailsTable from '../components/detailsTable';
import ProductsNavBar from '../components/productsNavBar';

const ROUTE = 'customer_order_details';
const ID_ORDER = 'element-order-details-label-order-id';
const SELLER_NAME = 'element-order-details-label-seller-name';
const DATE_ORDER = 'element-order-details-label-order-date';
const STATUS_ORDER = 'element-order-details-label-delivery-status';

const TOTAL_PRICE = 'element-order-total-price';

function orderDetails() {
  return (
    <div>
      <ProductsNavBar />
      <h1>Detalhe do Pedido</h1>
      <p data-testid={ `${ROUTE}__${ID_ORDER}` }> PEDIDO:</p>
      <p data-testid={ `${ROUTE}__${SELLER_NAME}` }>P. Vend:</p>
      <p data-testis={ `${ROUTE}__${DATE_ORDER}` }>DATE:</p>
      <p data-testid={ `${ROUTE}__${STATUS_ORDER}` }>Status:</p>
      <DetailsTable />
      <p data-testid={ `${ROUTE}__${TOTAL_PRICE}` }>TOTAL:</p>
    </div>
  );
}

export default orderDetails;
