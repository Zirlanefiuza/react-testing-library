import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

const firstPokemon = pokemonList[0];
const details = 'More details';

test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  renderWithRouter(<App />);
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(firstPokemon.name);
  const typePokemon = screen.getByTestId('pokemon-type');
  expect(typePokemon).toHaveTextContent(firstPokemon.type);
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  const averageText = 'Average weight: '
    + `${firstPokemon.averageWeight.value} ${firstPokemon.averageWeight.measurementUnit}`;
  expect(pokemonWeight).toHaveTextContent(averageText);

  const pokemonImgAlt = `${firstPokemon.name} sprite`;
  const image = screen.getByAltText(pokemonImgAlt);
  expect(image).toBeVisible();
  expect(image.src).toBe(firstPokemon.image);
});
test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
  renderWithRouter(<App />);
  const pokemonLink = screen.getByRole('link', { name: details });
  expect(pokemonLink.href).toContain(`/pokemon/${firstPokemon.id}`);
});
test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
  const { history } = renderWithRouter(<App />);
  const linkMoreDetails = screen.getByRole('link', { name: details });
  userEvent.click(linkMoreDetails);
  const textPokemon = screen.getByRole('heading', { name: `${firstPokemon.name} Details` });
  expect(textPokemon).toBeVisible();
  expect(history.location.pathname).toBe(`/pokemon/${firstPokemon.id}`);
});
test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
  renderWithRouter(<App />);
  const linkMoreDetails = screen.getByRole('link', { name: details });
  userEvent.click(linkMoreDetails);
  const checkBox = screen.getByRole('checkbox');
  userEvent.click(checkBox);
  const star = screen.getByRole('img', { name: `${firstPokemon.name} is marked as favorite` });
  expect(star).toBeVisible();
  expect(star.src).toContain('/star-icon.svg');
});
