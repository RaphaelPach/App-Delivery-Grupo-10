import { useState } from 'react';
import { Redirect } from 'react-router';

const ROUTE = 'common_register';
const NAME_ELEMENT = 'input-name';
/* const EMAIL_ELEMENT = 'input-email'; */
const PASSWORD_ELEMENT = 'input-password';
const REGISTER_BUTTON_ELEMENT = 'button-register';
const EMAIL_ERROR_ELEMENT = 'element-invalid-id';

function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [enableDisable, setEnableDisable] = useState(true);
  const [emailError, setEmailError] = useState(true);
  /* const [registerPage, setRegisterPage] = useState(false); */

  const loginHandle = (event) => {
    setLogin(event.target.value);

    if (regex.test(login)) {
      setEmailError(false);
    }
    if (regex.test(login) && password.length > SEVEN) {
      setEnableDisable(false);
    } else {
      setEnableDisable(true);
    }
  };

  const passwordHandle = (event) => {
    setPassword(event.target.value);

    if (password && regex.test(login) && password.length > SEVEN) {
      setEnableDisable(false);
    } else {
      setEnableDisable(true);
    }
  };

  const loginOnClick = () => <Redirect to="/" />;
  const registerOnClick = () => setRegisterPage(true);
  // tirar funções daqui

  return (
    <div>
      <label htmlFor="name">
        Name
        <input
          type="text"
          data-testid={ `${ROUTE}__${NAME_ELEMENT}` }
          name="name"
          onChange={ loginHandle }
          required
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          name="email"
          type="email"
          data-testid={ `${ROUTE}__${PASSWORD_ELEMENT}` }
          onChange={ passwordHandle }
          required
        />
      </label>
      <button
        type="button"
        onClick={ loginOnClick }
        disabled={ enableDisable }
        data-testid={ `${ROUTE}__${LOGIN_BUTTON_ELEMENT}` }
      >
        Senha
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

export default Register;
