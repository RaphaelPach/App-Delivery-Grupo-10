import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

const ROUTE = 'common_register';
const NAME_ELEMENT = 'input-name';
const EMAIL_ELEMENT = 'input-email';
const PASSWORD_ELEMENT = 'input-password';
const REGISTER_BUTTON_ELEMENT = 'button-register';
const REGISTER_ERROR_ELEMENT = 'element-invalid_register';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [trueOrFalse, setTrueOrFalse] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const VRegister = () => {
      const SIX = 6;
      const TWELVE = 12;
      return (Regex.test(email) && password.length >= SIX && name.length >= TWELVE);
    };
    if (VRegister()) {
      setTrueOrFalse(false);
    } else {
      setTrueOrFalse(true);
    }

    if (Regex.test(email)) {
      return setEmailError(false);
    }
  }, [email, password, name]);

  if (redirect) {
    return <Redirect to="/alguma-pagina" />;
  }

  return (
    <div>
      <label htmlFor="name">
        Nome
        <input
          type="text"
          data-testid={ `${ROUTE}__${NAME_ELEMENT}` }
          name="name"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          required
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          name="email"
          type="email"
          data-testid={ `${ROUTE}__${EMAIL_ELEMENT}` }
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          required
        />
      </label>
      <label htmlFor="senha">
        Senha
        <input
          name="senha"
          type="password"
          data-testid={ `${ROUTE}__${PASSWORD_ELEMENT}` }
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          required
        />
      </label>
      <button
        type="button"
        onClick={ () => setRedirect(true) }
        disabled={ trueOrFalse }
        data-testid={ `${ROUTE}__${REGISTER_BUTTON_ELEMENT}` }
      >
        CADASTRAR
      </button>
      <span data-testid={ `${ROUTE}__${REGISTER_ERROR_ELEMENT}` }>
        { emailError ? 'Alguma menssagem de erro' : null }
      </span>
    </div>
  );
}

export default Register;
