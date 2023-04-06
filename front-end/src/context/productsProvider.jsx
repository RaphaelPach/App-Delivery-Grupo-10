import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function ProductProvider({ children }) {
  const [update, setUpdate] = useState(0);

  const context = useMemo(() => ({
    update,
    setUpdate,
  }), [
    update,
    setUpdate,
  ]);

  return (
    <AppContext.Provider
      value={ context }
    >
      { children }
    </AppContext.Provider>
  );
}

ProductProvider.propTypes = {
  props: PropTypes.shape({
    children: PropTypes.node,
  }),
  history: PropTypes.objectOf.isRequired,
}.isRequired;

export default ProductProvider;
