import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TokenContext = React.createContext();

const TokenContextProvider = (props) => {
  const [token, setToken] = useLocalStorage('authorization', '');
  return <TokenContext.Provider value={[token, setToken]}>{props.children}</TokenContext.Provider>;
};

export { TokenContext, TokenContextProvider };
