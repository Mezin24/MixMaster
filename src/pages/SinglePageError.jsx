import { useRouteError } from 'react-router-dom';

export const SinglePageError = () => {
  const error = useRouteError();
  console.log(error);
  // return <h2>{error.message}</h2>;
  return <h2>There was an error...</h2>;
};
