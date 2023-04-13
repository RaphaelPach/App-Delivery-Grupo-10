import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import requestHTTP from '../Helpers/axios';

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
  // const [trueOrFalse, setTrueOrFalse] = useState(true);
  // const [loginTest, setLoginTest] = useState(false);
  const [redirect, setRedirect] = useState(false);
  /* const [registerPage, setRegisterPage] = useState(false); */

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
      const response = await requestHTTP({
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
  /* localStorage.setItem('user', JSON.stringify(user));
  setEmailError(false);
  if (user.role === 'administrator') {
  return history.push('/admin/manage');
  }
  return history.push('/customer/products'); */
  if (redirect) {
    return <Redirect to="/register" />;
  }

  return (
    <form action="post" onSubmit={ (event) => requestLogin(event) }>
      <label htmlFor="email">
        Email
        <input
          type="email"
          data-testid={ `${ROUTE}__${EMAIL_ELEMENT}` }
          name="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="E-mail"
          required
        />
      </label>
      <label htmlFor="password">
        senha
        <input
          name="password"
          type="password"
          data-testid={ `${ROUTE}__${PASSWORD_ELEMENT}` }
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="senha"
          required
        />
      </label>
      <button
        type="submit"
        disabled={ Vlogin() }
        data-testid={ `${ROUTE}__${LOGIN_BUTTON_ELEMENT}` }
      >
        Login
      </button>
      <button
        type="button"
        onClick={ () => setRedirect(true) }
        data-testid={ `${ROUTE}__${REGISTER_BUTTON_ELEMENT}` }
      >
        Ainda não tenho conta
      </button>
      <span data-testid={ `${ROUTE}__${EMAIL_ERROR_ELEMENT}` }>
        { emailError ? 'mensagem' : null }
      </span>
    </form>
  );
}

export default Login;
