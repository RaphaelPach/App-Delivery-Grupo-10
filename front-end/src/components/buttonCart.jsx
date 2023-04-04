const ROUTE = 'customer_products';

const BUTTON_CART = 'button-cart';
const CHECKOUT_BOTTOM_VALUE = 'checkout-bottom-value';

function ButtonCart() {
  const priceFunc = () => {
    if (localStorage.getItem('Cart') === null
      || JSON.parse(localStorage.getItem('Cart')).length === 0) {
      return 0.00;
    }

    let result = 0.00;

    const obj = JSON.parse(localStorage.getItem('Cart'));
    obj.forEach((e) => {
      const a = e.price * e.quantity;
      result += a;
    });
    console.log(result);
    return result;
  };

  return (
    <button type="button" data-testid={ `${ROUTE}__${BUTTON_CART}` }>
      <span data-testid={ `${ROUTE}__${CHECKOUT_BOTTOM_VALUE}` }>
        { priceFunc() }
      </span>
    </button>
  );
}

export default ButtonCart;
