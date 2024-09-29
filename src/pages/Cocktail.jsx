import axios from 'axios';
import { Link, useLoaderData, Navigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailPage';
import { useQuery } from '@tanstack/react-query';

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function searchCocktailQuery(id) {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      console.log(data?.drinks?.[0]);
      return data?.drinks?.[0];
    },
  };
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    await queryClient.ensureQueryData(searchCocktailQuery(params.id));
    return { id: params.id };
  };

export const Cocktail = () => {
  const { id } = useLoaderData();
  const { data: drink } = useQuery(searchCocktailQuery(id));
  console.log(drink);

  if (!drink) {
    return <Navigate to='/' />;
  }

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strGlass: glass,
    strInstructions: instructions,
    strCategory: category,
  } = drink;

  const ingredients = Object.entries(drink)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([_, value]) => value);

  return (
    <Wrapper>
      <header>
        <Link to='/' className='btn'>
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name: </span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category: </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info: </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass: </span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>ingredients: </span>
            {ingredients.join(', ')}
          </p>
          <p>
            <span className='drink-data'>instructions: </span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
