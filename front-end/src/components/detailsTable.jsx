import { Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

const TABLE_ITEM_NUMBER = 'element-order-table-item-number';
const TABLE_ITEM_NAME = 'element-order-table-name';
const TABLE_ITEM_QUANTITY = 'element-order-table-quantity';
const TABLE_UNIT_PRICE = 'element-order-table-unit-price';
const TABLE_SUB_TOTAL = 'element-order-table-sub-total';

function detailsTable(props) {
  const { index, product, ROUTE } = props;
  const { name, SaleProduct, price } = product;
  const { quantity } = SaleProduct;

  return (
    <Box sx={ { alignItems: 'center' } }>
      <Table
        component={ Paper }
        elevation={ 4 }
        sx={ { marginTop: '10px' } }
      >
        <TableBody>
          <TableRow>
            <TableCell data-testid={ `${ROUTE}__${TABLE_ITEM_NUMBER}-${index}` }>
              {index + 1}
            </TableCell>
            <TableCell data-testid={ `${ROUTE}__${TABLE_ITEM_NAME}-${index}` }>
              {name}
            </TableCell>
            <TableCell data-testid={ `${ROUTE}__${TABLE_ITEM_QUANTITY}-${index}` }>
              {Number(quantity)}
            </TableCell>
            <TableCell data-testid={ `${ROUTE}__${TABLE_UNIT_PRICE}-${index}` }>
              { price.replace('.', ',') }

            </TableCell>
            <TableCell data-testid={ `${ROUTE}__${TABLE_SUB_TOTAL}-${index}` }>
              { (Number(quantity) * Number(price)).toFixed(2).replace('.', ',') }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

detailsTable.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.shape({
    SaleProduct: PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    }),
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  ROUTE: PropTypes.string.isRequired,
};

export default detailsTable;
