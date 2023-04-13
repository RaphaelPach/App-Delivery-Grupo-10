import PropTypes from 'prop-types';

const TABLE_ITEM_NUMBER = 'element-order-table-item-number';
const TABLE_ITEM_NAME = 'element-order-table-name';
const TABLE_ITEM_QUANTITY = 'element-order-table-quantity';
const TABLE_UNIT_PRICE = 'element-order-table-unit-price';
const TABLE_SUB_TOTAL = 'element-order-table-sub-total';

function DetailsTable(props) {
  const { index, product, ROUTE } = props;
  const { name, SaleProduct, price } = product;
  const { quantity } = SaleProduct;

  return (
    <tr>
      <td data-testid={ `${ROUTE}__${TABLE_ITEM_NUMBER}-${index}` }>{index + 1}</td>
      <td data-testid={ `${ROUTE}__${TABLE_ITEM_NAME}-${index}` }>{name}</td>
      <td data-testid={ `${ROUTE}__${TABLE_ITEM_QUANTITY}-${index}` }>
        {Number(quantity)}
      </td>
      <td data-testid={ `${ROUTE}__${TABLE_UNIT_PRICE}-${index}` }>
        { price.replace('.', ',') }

      </td>
      <td data-testid={ `${ROUTE}__${TABLE_SUB_TOTAL}-${index}` }>
        { (Number(quantity) * Number(price)).toFixed(2).replace('.', ',') }
      </td>
    </tr>
  );
}

DetailsTable.propTypes = {
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

export default DetailsTable;
