import PropTypes from 'prop-types';

const ROUTE = 'customer_order_details';

const TABLE_ITEM_NUMBER = 'element-order-table-item-number';
const TABLE_ITEM_NAME = 'element-order-table-name';
const TABLE_ITEM_QUANTITY = 'element-order-table-quantity';
const TABLE_UNIT_PRICE = 'element-order-table-unit-price';
const TABLE_SUB_TOTAL = 'element-order-table-sub-total';

function DetailsTable(props) {
  const { index } = props;
  const { product } = props;
  const { name, SaleProduct, price } = product;
  const { quantity } = SaleProduct;

  return (
    <div>
      <tbody>
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
      </tbody>
    </div>
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
};

export default DetailsTable;
