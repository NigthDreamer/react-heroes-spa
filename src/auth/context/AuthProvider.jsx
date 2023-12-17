import React, { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

import { types } from '../types/types';

//Con la funcion init, esto sobra
const initialState = {
  logged: false,
  name: null,
};

const init = () => {
  //Leo el usuario (si existe) del local storage
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    logged: !!user, //Si el usuario existe, logged sera true
    user: user,
  };
};

export const AuthProvider = ({ children }) => {
  /**
   * Creo el reducer con el authReducer, que se encargara de cambiar el estado
   * en funcion del tipo de accion que se le pase por el dispatch y su payload.
   * Le paso el estado inicial (que sobra porque tambien le pasamos la funcion
   * inicializadora) y la funcion inicializadora que seteara el estado por
   * defecto del reducer al instanciarse.
   */
  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  const login = async (name = '') => {
    //Seteo el usuario
    const user = { id: 'ABC', name };

    //Seteo la accion con el payload para el reducer
    const action = {
      type: types.login,
      payload: user,
    };

    //Guardo el usuario en el local storage
    localStorage.setItem('user', JSON.stringify(user));

    //Seteo la accion del login en el reducer
    dispatch(action);
  };

  const logout = () => {
    //Borro el usuario del local storage
    localStorage.removeItem('user');

    //Seteo la accion de logout
    const action = {
      type: types.logout,
    };

    //Seteo la accion del logout en el reducer
    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
