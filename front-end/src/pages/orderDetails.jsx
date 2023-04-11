import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailsTable from '../components/detailsTable';
import ProductsNavBar from '../components/productsNavBar';
import { loginHTTP } from '../Helpers/axios';

const ROUTE = 'customer_order_details';
const ID_ORDER = 'element-order-details-label-order-id';
const SELLER_NAME = 'element-order-details-label-seller-name';
const DATE_ORDER = 'element-order-details-label-order-date';
const STATUS_ORDER = 'element-order-details-label-delivery-status';
const DELIVERY_CHECK = 'button-delivery-check';
const TOTAL_PRICE = 'element-order-total-price';

function OrderDetails() {
  const { id } = useParams();

  const [sale, setSale] = useState({ seller: {}, products: [] });
  const [status, setStatus] = useState('');
  const date = new Date(sale.saleDate);
  const formatedDate = date.toLocaleDateString('pt-BR');

  useEffect(() => {
    const getSale = async () => {
      console.log(id);
      const result = await loginHTTP({
        url: `/sales/${id}`,
        method: 'GET',
      });
      setSale(result.data);
      setStatus(result.status);
    };

    getSale();
  }, [id]);
  console.log(sale);

  const thead = () => (
    <thead>
      <tr>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Sub-Total</th>
        <th>Remover Item</th>
      </tr>
    </thead>
  );

  function isDisabled() {
    return status !== 'em transito';
  }

  return (
    <div>
      <ProductsNavBar />
      <h1>Detalhe do Pedido</h1>
      <p data-testid={ `${ROUTE}__${ID_ORDER}` }>
        {' '}
        {' '}
        {sale.id}
      </p>
      <p data-testid={ `${ROUTE}__${SELLER_NAME}` }>
        {' '}
        {sale.seller.name}
      </p>
      <p data-testid={ `${ROUTE}__${DATE_ORDER}` }>{formatedDate}</p>
      <p data-testid={ `${ROUTE}__${STATUS_ORDER}` }>{sale.status}</p>
      <button
        type="button"
        data-testid={ `${ROUTE}__${DELIVERY_CHECK}` }
        disabled={ isDisabled() }
      >
        Marcar como entregue
      </button>
      <table>
        { thead }
        { sale.products.map((p, index) => (
          <DetailsTable key={ p.name } index={ index } product={ p } />
        )) }
      </table>
      <p data-testid={ `${ROUTE}__${TOTAL_PRICE}` }>
        {' '}
        { `${sale.totalPrice}`.replace('.', ',') }
      </p>
    </div>
  );
}

export default OrderDetails;
