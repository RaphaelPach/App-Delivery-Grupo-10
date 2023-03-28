import { useState } from 'react';
import { redirect } from 'react-router-dom';

const ROUTE = 'common_login';
const EMAIL_ELEMENT = 'input-email';
const PASSWORD_ELEMENT = 'input-password';
const LOGIN_BUTTON_ELEMENT = 'button-login';
const REGISTER_BUTTON_ELEMENT = 'button-register';
const EMAIL_ERROR_ELEMENT = 'element-invalid-id';

const regex = /^([a-z\d-]+)@([a-z\d-]+)\.([a-z]{2,8})$/;
const SIX = 6;

function Login() {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [enableDisable, setEnableDisable] = useState(true);
  const [emailError, setEmailError] = useState(true);

  // vendo aula de context do wolf

  const loginHandle = (event) => {
    setLogin(event.target.value);

    if (regex.test(login)) {
      setEmailError(false);
    }
    if (regex.test(login) && password.length > SIX) {
      setEnableDisable(false);
    } else {
      setEnableDisable(true);
    }
  };

  const passwordHandle = (event) => {
    setPassword(event.target.value);

    if (regex.test(login) && password.length > SIX) {
      setEnableDisable(false);
    } else {
      setEnableDisable(true);
    }
  };

  const loginOnClick = () => redirect('/alguma-rota');
  const registerOnClick = () => redirect('/register');
  // tirar funções daqui

  return (
    <div>
      <input
        type="email"
        data-testid={ `${ROUTE}__${EMAIL_ELEMENT}` }
        onChange={ loginHandle }
      />
      <input
        type="password"
        data-testid={ `${ROUTE}__${PASSWORD_ELEMENT}` }
        onChange={ passwordHandle }
      />
      <button
        type="button"
        onClick={ loginOnClick }
        disabled={ enableDisable }
        data-testid={ `${ROUTE}__${LOGIN_BUTTON_ELEMENT}` }
      >
        Login
      </button>
      <button
        type="button"
        onClick={ registerOnClick }
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
