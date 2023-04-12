import { useState, useEffect } from 'react';
import ProductsNavBar from '../components/productsNavBar';
import { loginHTTP } from '../Helpers/axios';

const ROUTE = 'admin_manage';
const NAME_ELEMENT = 'input-name';
const EMAIL_ELEMENT = 'input-email';
const PASSWORD_ELEMENT = 'input-password';
const REGISTER_BUTTON_ELEMENT = 'button-register';
const SELECT_ROLE_BUTTON = 'select-role';
const REGISTER_ERROR_ELEMENT = 'element-invalid-register';

function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [choice, setChoice] = useState('costumer');
  const [trueOrFalse, setTrueOrFalse] = useState(true);
  const [emailError, setEmailError] = useState(false);
  // const history = useHistory();
  console.log(emailError);
  const VRegister = () => {
    const Regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const SIX = 6;
    const TWELVE = 12;
    const result = !(
      Regex.test(email) && password.length >= SIX && name.length >= TWELVE && choice);
    setTrueOrFalse(result);
  };

  const requestRegister = async (event) => {
    event.preventDefault();
    console.log();
    try {
      const admin = JSON.parse(localStorage.getItem('user'));
      const { token } = admin;
      await loginHTTP({
        url: '/admin/manage',
        method: 'POST',
        body:
         { name, email, password, role: choice },
        token });
    } catch (error) {
      setEmailError(true);
      console.log(error);
      return new Error();
    }
  };

  useEffect(() => {
    VRegister();
  });

  return (
    <div>
      <ProductsNavBar />
      <form action="post" onSubmit={ requestRegister }>
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
        <label htmlFor="select_role">
          Tipo:
          <select
            name="select_role"
            id="select_role"
            type="select"
            onChange={ (e) => setChoice(e.target.value) }
            data-testid={ `${ROUTE}__${SELECT_ROLE_BUTTON}` }
          >
            <option value="seller">Vendedor</option>
            <option value="customer" selected>Cliente</option>
          </select>
          <button
            type="submit"
            disabled={ trueOrFalse }
            onClick={ requestRegister }
            data-testid={ `${ROUTE}__${REGISTER_BUTTON_ELEMENT}` }
          >
            Cadastrar
          </button>
        </label>
        <span data-testid={ `${ROUTE}__${REGISTER_ERROR_ELEMENT}` }>
          { emailError ? 'Alguma menssagem de erro' : null }
        </span>

      </form>

    </div>
  );
}

export default AdminRegister;
