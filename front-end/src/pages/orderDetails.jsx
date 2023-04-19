import { Box, Button, Container } from '@mui/material';
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
    <Box
      sx={ { width: { md: '100%', xs: '30%' },
        backgroundColor: '#fffde7',
        height: '100vh' } }
    >
      <ProductsNavBar />
      <Box sx={ { alignItens: 'center' } }>
        <h2>Detalhe do Pedido</h2>
        <Container sx={ { alignItems: 'center', paddingTop: '5px' } }>
          <p data-testid={ `${ROUTE}__${ID_ORDER}` }>
            PEDIDO
            {' '}
            {sale.id}
          </p>
          <p data-testid={ `${ROUTE}__${SELLER_NAME}` }>
            P. Vend:
            {' '}
            {sale.seller.name}
          </p>
          <p data-testid={ `${ROUTE}__${DATE_ORDER}` }>{formatedDate}</p>
          <p data-testid={ `${ROUTE}__${STATUS_ORDER}` }>{sale.status}</p>
          <Button
            type="button"
            data-testid={ `${ROUTE}__${DELIVERY_CHECK}` }
            disabled={ isDisabled() }
          >
            Marcar como entregue
          </Button>
          <table>
            { thead }
            { sale.products.map((p, index) => (
              <DetailsTable key={ p.name } index={ index } product={ p } />
            )) }
          </table>
          <p data-testid={ `${ROUTE}__${TOTAL_PRICE}` }>
            Total:
            {' '}
            { `${sale.totalPrice}`.replace('.', ',') }
          </p>
        </Container>
      </Box>
    </Box>
  );
}

export default OrderDetails;
