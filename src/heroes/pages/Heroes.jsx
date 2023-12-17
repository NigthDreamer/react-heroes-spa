import { Navbar } from "../../ui";
import { Outlet } from 'react-router-dom'

export const Heroes = () => {
  // Si el usuario esta logeado, le dejo pasar, si no le mando al login
  return (
    <>
      <Navbar />

      <div className="container">
        <Outlet />
      </div>
    </>
  )
};