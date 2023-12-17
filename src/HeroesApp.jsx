import { AppRouter } from './router/AppRouter';

export const HeroesApp = () => {
  //No se puede meter un provider por encima del Approuter
  return <AppRouter />;
};
