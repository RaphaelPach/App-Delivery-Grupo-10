import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductsNavBar from '../components/productsNavBar';
import ProductCard from '../components/productsCard';

import loginHTTP from '../Helpers/axios';

function Products() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const ONE_SEC = 1000;

    const getProducts = async () => {
      if (JSON.parse(localStorage.getItem('user')) === null) {
        localStorage.setItem('user', JSON.stringify({ token: '' }));
      }
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await loginHTTP({
          method: 'get', url: '/customer/products', token: user.token });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem('user');
        history.push('/');
        return new Error();
      }
    };

    getProducts();

    const timer = setTimeout(() => setLoading(false), ONE_SEC);

    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  return (
    <div>
      <ProductsNavBar />
      { isLoading ? <div>LOADING...</div> : products
        .map((product) => (<ProductCard key={ product.id } product={ product } />))}
    </div>
  );
}

export default Products;
