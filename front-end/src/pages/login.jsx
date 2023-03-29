import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const ROUTE = 'common_login';
const EMAIL_ELEMENT = 'input-email';
const PASSWORD_ELEMENT = 'input-password';
const LOGIN_BUTTON_ELEMENT = 'button-login';
const REGISTER_BUTTON_ELEMENT = 'button-register';
const EMAIL_ERROR_ELEMENT = 'element-invalid-id';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [trueOrFalse, setTrueOrFalse] = useState(true);
  const [loginTest, setLoginTest] = useState(false);
  const [redirect, setRedirect] = useState(false);
  /* const [registerPage, setRegisterPage] = useState(false); */

  useEffect(() => {
    const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const Vlogin = () => {
      const SIX = 6;
      return (Regex.test(email) && password.length >= SIX);
    };
    if (Vlogin()) {
      setTrueOrFalse(false);
    } else {
      setTrueOrFalse(true);
    }

    if (Regex.test(email)) {
      return setEmailError(false);
    }
  }, [email, password]);

  if (redirect) {
    return <Redirect to="/register" />;
  }

  if (loginTest) {
    return <Redirect to="/" />;
  }

  return (
    <div>
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
        type="button"
        onClick={ () => setLoginTest(true) }
        disabled={ trueOrFalse }
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
        { emailError ? 'Alguma menssagem de erro' : null }
      </span>
    </div>
  );
}

export default Login;
