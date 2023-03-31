import { useState } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom'; // < ----- serase2?
import loginHTTP from '../Helpers/axio';

const ROUTE = 'common_login';
const EMAIL_ELEMENT = 'input-email';
const PASSWORD_ELEMENT = 'input-password';
const LOGIN_BUTTON_ELEMENT = 'button-login';
const REGISTER_BUTTON_ELEMENT = 'button-register';
const EMAIL_ERROR_ELEMENT = 'element-invalid-email';

function Login() {
  const history = useHistory(); // <---------serase?
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  // const [trueOrFalse, setTrueOrFalse] = useState(true);
  // const [loginTest, setLoginTest] = useState(false);
  const [redirect, setRedirect] = useState(false);
  /* const [registerPage, setRegisterPage] = useState(false); */

  const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const Vlogin = () => {
    const SIX = 6;
    return !(Regex.test(email) && password.length >= SIX);
  };

  // tentativa numero 268, o mundo nao consegue mais saber se tudo está certo ou nao

  const requestLogin = async (event) => {
    event.preventDefault();
    try {
      await loginHTTP('post', '/login', { email, password });
      setEmailError(false); // <-- só pra mostrar mensagem que deu ruim
      return history.push('/customer/products');
    } catch (error) {
      setEmailError(true);
      return new Error();
    }
  };

  if (redirect) {
    // funciona
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
        /*  onClick={ () => setLoginTest(true) } */
        disabled={ Vlogin() }
        data-testid={ `${ROUTE}__${LOGIN_BUTTON_ELEMENT}` }
      >
        Login
      </button>
      <button
        type="button"
        onClick={ () => setRedirect(true) } // sem aquele if nao vai
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
