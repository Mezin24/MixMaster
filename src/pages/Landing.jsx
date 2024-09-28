import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { CocktailList } from '../components';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const loader = async () => {
  const searchTerm = '';
  try {
    const { data } = await axios.get(url + searchTerm);
    return { drinks: data.drinks, searchTerm };
  } catch (error) {
    console.log(error);
  }
};

export const Landing = () => {
  const { drinks, searchTerm } = useLoaderData();
  console.log(drinks);
  return (
    <>
      <CocktailList drinks={drinks} />
    </>
  );
};
