import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

test('Teste se é exibida a mensagem "No favorite Pokémon found', () => {
  render(<FavoritePokemon />);
  const noFavoriteMessage = screen.getByText(/no favorite pokémon found/i);

  expect(noFavoriteMessage).toBeInTheDocument();
});

test('Teste são exibidos apenas os pokémons favoritados', () => {
  localStorage.setItem('favoritePokemonIds', '[25, 4]');

  const { history } = renderWithRouter(<App />);

  act(() => {
    history.push('/favorites');
  });

  const favorites = screen.getAllByTestId('pokemon-name');
  const favoritesName = ['Pikachu', 'Charmander'];
  expect(favorites).toHaveLength(2);
  favoritesName.forEach((name, index) => {
    expect(favorites[index]).toHaveTextContent(name);
  });
});
