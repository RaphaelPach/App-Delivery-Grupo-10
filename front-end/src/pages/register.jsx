import { Box, Button, Container, Paper, Stack, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
/* import { Redirect } from 'react-router'; */
import { useHistory } from 'react-router-dom';
import requestHTTP from '../Helpers/axios';

const ROUTE = 'common_register';
const NAME_ELEMENT = 'input-name';
const EMAIL_ELEMENT = 'input-email';
const PASSWORD_ELEMENT = 'input-password';
const REGISTER_BUTTON_ELEMENT = 'button-register';
const REGISTER_ERROR_ELEMENT = 'element-invalid_register';

function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [trueOrFalse, setTrueOrFalse] = useState(true);
  const [emailError, setEmailError] = useState(false);
  /*   const [redirect, setRedirect] = useState(false); */

  const VRegister = () => {
    const Regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const SIX = 6;
    const TWELVE = 12;
    const result = !(
      Regex.test(email) && password.length >= SIX && name.length >= TWELVE);
    setTrueOrFalse(result);
  };
  const requestRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await requestHTTP({
        method: 'POST', url: '/register', body: { name, email, password } });

      const user = {
        token: response.data.token,
        name,
        email,
        role: response.data.role,
      };

      localStorage.setItem('user', JSON.stringify(user));

      return history.push('/customer/products');
    } catch (error) {
      setEmailError(true);
      return new Error();
    }
  };
  useEffect(() => {
    VRegister();
  });
  return (
    <Box
      action="post"
      onSubmit={ requestRegister }
      sx={ { display: 'flex',
        width: '100%',
        minHeight: '100vh',
        alignItems: 'center',
        backgroundColor: '#fffde7',
        height: '100vh',
      } }
    >
      <Container>
        <Paper elevation={ 10 }>
          <Stack
            sx={ {
              padding: '100px' } }
          >
            <TextField
              type="text"
              label="Nome"
              data-testid={ `${ROUTE}__${NAME_ELEMENT}` }
              name="name"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
              required
            />
            <TextField
              name="email"
              type="email"
              label="Email"
              sx={ { margin: '10px 0' } }
              data-testid={ `${ROUTE}__${EMAIL_ELEMENT}` }
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              required
            />
            <TextField
              name="senha"
              label="Senha"
              type="password"
              data-testid={ `${ROUTE}__${PASSWORD_ELEMENT}` }
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              required
            />

            <Button
              type="submit"
              sx={ { margin: '10px 0' } }
              variant="contained"
              disabled={ trueOrFalse }
              onClick={ requestRegister }
              data-testid={ `${ROUTE}__${REGISTER_BUTTON_ELEMENT}` }
            >
              CADASTRAR
            </Button>
            <span data-testid={ `${ROUTE}__${REGISTER_ERROR_ELEMENT}` }>
              { emailError ? 'Alguma menssagem de erro' : null }
            </span>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;
