import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Container, Paper } from '@mui/material';
import ProductsNavBar from '../components/productsNavBar';
import ProductCard from '../components/productsCard';
// pelo amor de deus
import requestHTTP from '../Helpers/axios';
import ButtonCart from '../components/buttonCart';

function Products() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const ONE_SEC = 1000;

    const getProducts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await requestHTTP({
          method: 'GET', url: '/customer/products', token: user.token });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem('user');
        return history.push('/');
      }
    };

    getProducts();

    const timer = setTimeout(() => setLoading(false), ONE_SEC);

    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  return (
    <Box sx={ { width: { md: '100%', xs: '30%' } } }>
      <ProductsNavBar />
      <Box sx={ { backgroundColor: '#fffde7' } }>
        <Container sx={ { alignItems: 'center', paddingTop: '5px' } }>
          <Paper
            elevation={ 10 }
            sx={ { display: 'flex',
              flexWrap: 'wrap',
              marginTop: '50px',
              justifyContent: 'center',
            } }
          >
            { isLoading ? <div>LOADING...</div> : products
              .map((product) => (<ProductCard key={ product.id } product={ product } />))}
          </Paper>
          <ButtonCart />
        </Container>
      </Box>
    </Box>
  );
}

export default Products;
