import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '@mui/system';
import {
  Box,
  Button,
  Paper,
  Select,
  Stack,
  Table,
  TextField,
} from '@mui/material';
import AppContext from '../context/AppContext';

import ProductsNavBar from '../components/productsNavBar';
import CheckoutTable from '../components/checkoutTable';
import TotalPrice from '../components/totalPrice';
import requestHTTP from '../Helpers/axios';

const ROUTE_TOTAL_PRICE = 'customer-checkout';
const TOTAL_PRICE = 'element-order-total-price';

function Checkout() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [sellerId, setSellerId] = useState(2);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState(0);

  const { update } = useContext(AppContext);

  const calculation = () => {
    if (
      localStorage.getItem('Cart') === null
      || JSON.parse(localStorage.getItem('Cart')).length === 0
    ) {
      return setTotalPrice(0.0);
    }
    let result = 0.0;
    const obj = JSON.parse(localStorage.getItem('Cart'));
    obj.forEach((e) => {
      const a = Number(e.price) * Number(e.quantity);
      result += a;
    });
    return setTotalPrice(result);
  };

  const getSellers = async () => {
    const response = await requestHTTP({
      method: 'GET',
      url: '/sellers',
    });
    setSellers(response.data);
  };

  const getCustomers = async () => {
    const response = await requestHTTP({
      method: 'GET',
      url: '/customers',
    });
    setCustomers(response.data);
  };

  useEffect(() => {
    const ONE_SEC = 1000;
    getSellers();
    getCustomers();
    calculation();

    const cart = JSON.parse(localStorage.getItem('Cart'));
    setProducts(cart);

    const timer = setTimeout(() => setLoading(false), ONE_SEC);

    return () => {
      clearTimeout(timer);
    };
  }, [update]);

  const finishOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const rightUser = customers.find((e) => e.name === user.name);

      console.log(user.token);

      const response = await requestHTTP({
        method: 'POST',
        url: '/newSale',
        body: {
          userId: rightUser.id,
          sellerId,
          totalPrice,
          deliveryAddress,
          deliveryNumber,
          products,
        },
        token: user.token,
      });

      return history.push(`/customer/orders/${response.data.id}`);
    } catch (error) {
      return new Error();
    }
  };

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

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Box sx={ { backgroundColor: '#fffde7', width: '100%', height: '100vh' } }>
      <ProductsNavBar />
      <Container
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: 700,
        } }
        aria-label="customized table"
      >
        <div>
          <h1>Finalizar Pedido</h1>
        </div>
        <Table component={ Paper } elevation={ 4 } sx={ { marginTop: '50px' } }>
          {thead()}
          {products.map((product, index) => (
            <CheckoutTable key={ product.id } index={ index } product={ product } />
          ))}
        </Table>
        <TotalPrice datatest={ { ROUTE_TOTAL_PRICE, TOTAL_PRICE } } />
        <Box sx={ { display: 'flex', justifyContent: 'center' } }>
          <h2>Detalhes e Endereço da Entrega:</h2>
        </Box>
        <Stack
          sx={ {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '1px',
          } }
        >
          Vendedora Responsável:
          <Select
            value={ sellerId }
            onClick={ (e) => setSellerId(e.target.value) }
            id="seller"
            data-testid="customer_checkout__select-seller"
          >
            {sellers.map((e) => (
              <option key={ e.id } value={ e.id }>
                {e.name}
              </option>
            ))}
          </Select>
          <TextField
            label="Endereço"
            onChange={ (e) => setDeliveryAddress(e.target.value) }
            id="address"
            type="text"
            data-testid="customer_checkout__input-address"
          />
          <TextField
            label="Número"
            onChange={ (e) => setDeliveryNumber(Number(e.target.value)) }
            id="addressNumber"
            type="number"
            data-testid="customer_checkout__input-address-number"
          />
        </Stack>
        <Button
          variant="contained"
          sx={ { display: 'flex', width: '150px', marginTop: '10px' } }
          onClick={ finishOrder }
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </Button>
      </Container>
    </Box>
  );
}

export default Checkout;
