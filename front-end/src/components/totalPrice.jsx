import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import AppContext from '../context/AppContext';

const ROUTE = 'customer_checkout';
const ORDERPRICE = 'element-order-total-price';

function TotalPrice() {
  /* const { datatest } = props; */
  /* const { ROUTE_TOTAL_PRICE, TOTAL_PRICE } = datatest; */
  const [totalPrice, setTotalPrice] = useState(0.00);
  const { update } = useContext(AppContext);

  useEffect(() => {
    const calculation = () => {
      if (localStorage.getItem('Cart') === null
        || (JSON.parse(localStorage.getItem('Cart'))).length === 0) {
        return setTotalPrice(0.00);
      }
      let result = 0.00;
      const obj = JSON.parse(localStorage.getItem('Cart'));
      console.log(obj);
      obj.forEach((e) => {
        const a = Number(e.price) * Number(e.quantity);
        result += a;
      });
      return setTotalPrice(result);
    };
    calculation();
  }, [update]);

  return (
    <Box
      data-testid={ `${ROUTE}__${ORDERPRICE}` }
      sx={ { marginTop: '20px', fontSize: '25px' } }
    >
      { totalPrice.toFixed(2).replace('.', ',') }
    </Box>
  );
}

TotalPrice.propTypes = {
  datatest: PropTypes.shape({
    ROUTE_TOTAL_PRICE: PropTypes.string.isRequired,
    TOTAL_PRICE: PropTypes.string.isRequired,
  }).isRequired,
};

export default TotalPrice;
