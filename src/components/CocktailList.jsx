import Wrapper from '../assets/wrappers/CocktailList';
import { CocktailCard } from './CocktailCard';

export const CocktailList = ({ drinks }) => {
  if (!drinks) {
    return <h4 style={{ textAlign: 'center' }}>No coctails found...</h4>;
  }

  const formattedDrinks = drinks.map((drink) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });
  return (
    <Wrapper>
      {formattedDrinks.map((item) => (
        <CocktailCard {...item} key={item.id} />
      ))}
    </Wrapper>
  );
};
