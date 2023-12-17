import { PublicRoute } from "../../router/PublicRoute";
import { LoginPage } from "../pages";

export const AuthRoutes = {
  path: 'login',
  element: 
  <PublicRoute>
    <LoginPage />
  </PublicRoute>
}
