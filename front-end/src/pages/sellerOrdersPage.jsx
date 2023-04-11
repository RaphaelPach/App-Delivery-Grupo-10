import { useEffect, useState } from 'react';

import SellerNavBar from '../components/sellerNavBar';
import SellerOrderButton from '../components/sellerOrderButton';
import { loginHTTP } from '../Helpers/axios';

function SellerOrdersPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      const users = await loginHTTP({
        method: 'GET', url: '/sellers' });

      const user = JSON.parse(localStorage.getItem('user'));
      const rightUser = users.data.find((e) => e.name === user.name);

      const response = await loginHTTP({
        method: 'POST', url: '/seller/sales', body: { id: Number(rightUser.id) } });

      setProducts(response.data);
    };

    getCustomers();
  }, []);

  return (
    <div>
      <SellerNavBar />
      { products.map((product) => (
        <SellerOrderButton key={ product.id } product={ product } />
      )) }
    </div>
  );
}

export default SellerOrdersPage;
