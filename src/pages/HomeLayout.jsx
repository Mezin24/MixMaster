import { Outlet, useNavigation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const HomeLayout = () => {
  const navigation = useNavigation();
  const isPending = navigation.state === 'loading';
  const value = 'some value';
  return (
    <div>
      <Navbar />
      <section className='page'>
        {isPending ? (
          <div className='loading' />
        ) : (
          <Outlet context={{ value }} />
        )}
      </section>
    </div>
  );
};
