import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente App', () => {
  test('Teste: Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const pathLinks = ['/', '/about', '/favorites', '/notFoundPage'];
    const { history } = renderWithRouter(<App />);
    const routerLinks = screen.getAllByRole('link');

    pathLinks.forEach((pathlink) => {
      act(() => {
        history.push(pathlink);
      });

      expect(routerLinks[0]).toHaveTextContent('Home');
      expect(routerLinks[0]).toBeInTheDocument();

      expect(routerLinks[1]).toHaveTextContent('About');
      expect(routerLinks[1]).toBeInTheDocument();

      expect(routerLinks[2]).toHaveTextContent('Favorite Pokémon');
      expect(routerLinks[2]).toBeInTheDocument();
    });
  });

  test('Teste: Se o link About redireciona para a página de sobre a pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(aboutLink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste: Se o link Home redireciona para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });

    expect(homeLink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste: Se o link Favorites redireciona para a página de pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(favoritesLink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });
});
