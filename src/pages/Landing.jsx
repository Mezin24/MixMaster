import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { CocktailList, SearchForm } from '../components';
import { useQuery } from '@tanstack/react-query';

const cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const { data } = await axios.get(cocktailUrl + searchTerm);
      return data?.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || '';
    // const { data } = await axios.get(cocktailUrl + searchTerm);
    // return { drinks: data.drinks, searchTerm };
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm };
  };

export const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      {drinks && <CocktailList drinks={drinks} />}
    </>
  );
};
