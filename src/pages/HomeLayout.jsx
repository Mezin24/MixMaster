import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <footer>footer</footer>
    </div>
  );
};
