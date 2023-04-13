import { useEffect, useState } from 'react';
import ProductsNavBar from '../components/productsNavBar';
import OrderCard from '../components/orderCard';
import requestHTTP from '../Helpers/axios';

function CustomerOrderPage() {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    const getSales = async () => {
      const result = await requestHTTP({
        method: 'GET', url: '/sales' });
      setSales(result.data);
    };

    getSales();
  }, []);

  return (
    <div>
      <ProductsNavBar />
      { sales.map((product) => (
        <OrderCard key={ product.id } product={ product } />
      )) }
    </div>
  );
}

export default CustomerOrderPage;
