import { Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import { loginHTTP } from '../Helpers/axios';
import photo from '../images/cerveja1.jpg';
/* import photo from '../images/anittaImage.jpg'; */
/* import cerveja2 from '../images/cerveja2'; */

const ROUTE = 'common_login';
const EMAIL_ELEMENT = 'input-email';
const PASSWORD_ELEMENT = 'input-password';
const LOGIN_BUTTON_ELEMENT = 'button-login';
const REGISTER_BUTTON_ELEMENT = 'button-register';
const EMAIL_ERROR_ELEMENT = 'element-invalid-email';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const Regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const Vlogin = () => {
    const SIX = 6;
    return !(Regex.test(email) && password.length >= SIX);
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser && localUser.role === 'administrator') {
      history.push('/admin/manage');
    } else if (localUser && localUser.role === 'customer') {
      history.push('/customer/products');
    } else if (localUser && localUser.role === 'seller') {
      history.push('/seller/orders');
    }
  }, [history]);

  const requestLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginHTTP({
        method: 'POST', url: '/login', body: { email, password } });

      const user = {
        token: response.data.token,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      };
      localStorage.setItem('user', JSON.stringify(user));

      const localUser = JSON.parse(localStorage.getItem('user'));

      if (localUser && localUser.role === 'administrator') {
        return history.push('/admin/manage');
      }

      if (localUser && localUser.role === 'seller') {
        return history.push('/seller/orders');
      }

      setEmailError(false);
      history.push('/customer/products');
    } catch (error) {
      setEmailError(true);
      return new Error();
    }
  };
  if (redirect) {
    return <Redirect to="/register" />;
  }

  return (
    <Box
      sx={ { display: 'flex',
        width: '100%',
        minHeight: '100vh',
        alignItems: 'center',
        backgroundImage: `url(${photo})`,
        backgroundSize: 'cover',
        backgroundPositionY: 'top',
      } }
    >
      <Container>
        <Paper
          elevation={ 10 }
          sx={ { width: { md: '30%', xs: '90%' }, bgcolor: '#fffde7' } }
        >
          <Stack
            action="post"
            component="form"
            spacing={ 2 }
            sx={ { p: 2 } }
            onSubmit={ (event) => requestLogin(event) }
          >
            <Typography
              variant="h2"
              color="primary"
              sx={ { textAlign: 'center', fontFamily: 'monospace' } }
            >
              Beer Drop
            </Typography>
            <TextField
              type="email"
              data-testid={ `${ROUTE}__${EMAIL_ELEMENT}` }
              name="email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              placeholder="E-mail"
              size="normal"
              required
            />
            <TextField
              name="password"
              type="password"
              data-testid={ `${ROUTE}__${PASSWORD_ELEMENT}` }
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              placeholder="senha"
              size="normal"
              required
            />
            <Button
              variant="contained"
              color="secondary"
              disabled={ Vlogin() }
              type="submit"
              data-testid={ `${ROUTE}__${LOGIN_BUTTON_ELEMENT}` }
            >
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={ () => setRedirect(true) }
              data-testid={ `${ROUTE}__${REGISTER_BUTTON_ELEMENT}` }
            >
              CADASTRAR
            </Button>
            <span data-testid={ `${ROUTE}__${EMAIL_ERROR_ELEMENT}` }>
              { emailError ? 'mensagem' : null }
            </span>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
