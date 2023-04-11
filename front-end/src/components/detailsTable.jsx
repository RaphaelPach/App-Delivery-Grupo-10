import PropTypes from 'prop-types';

const ROUTE = 'seller_order_details';

const TABLE_ITEM_NUMBER = 'element-order-table-item-number-';
const TABLE_ITEM_NAME = 'element-order-table-name-';
const TABLE_ITEM_QUANTITY = 'element-order-table-quantity-';
const TABLE_UNIT_PRICE = 'element-order-table-unit-price-';
const TABLE_SUB_TOTAL = 'element-order-table-sub-total-';

function DetailsTable(props) {
  const { index } = props;
  const { products } = props;
  const { id, name, quantity, price } = products;

  const thead = () => (
    <thead>
      <tr>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Sub-Total</th>
      </tr>
    </thead>
  );

  return (
    <div>
      <table>
        {thead}
        <tbody>
          <tr>
            <td data-testid={ `${ROUTE}__${TABLE_ITEM_NUMBER}${index}` }>{index}</td>
            <td data-testid={ `${ROUTE}__${TABLE_ITEM_NAME}${index}` }>{name}</td>
            <td data-testid={ `${ROUTE}__${TABLE_ITEM_QUANTITY}${index}` }>
              {Number(quantity)}
            </td>
            <td data-testid={ `${ROUTE}__${TABLE_UNIT_PRICE}${index}` }>
              { price.replace('.', ',') }

            </td>
            <td data-testid={ `${ROUTE}__${TABLE_SUB_TOTAL}` }>
              { (Number(quantity) * Number(price)).toFixed(2).replace('.', ',') }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

DetailsTable.propTypes = {
  index: PropTypes.number.isRequired,
  products: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailsTable;
