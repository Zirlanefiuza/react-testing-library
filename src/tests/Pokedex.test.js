import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

const TYPE_TESTID = 'pokemon-type';

test('Teste se tem um heading na página com o texto "Encountered Pokémon"', () => {
  renderWithRouter(<App />);

  const text = screen.getByRole('heading', { name: 'Encountered Pokémon' });

  expect(text).toBeInTheDocument();
});

test('Teste: Exibe o próximo pokémon da lista ao apertar no botão "Próximo Pokémon"', () => {
  renderWithRouter(<App />);

  const nextBtn = screen.getByRole('button', { name: /Próximo Pokémon/ });

  data.forEach(({ name }) => {
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
    expect(screen.getByText(name)).toBeInTheDocument();
    userEvent.click(nextBtn);
  });
  expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});

test('Teste se tem botões de filtros por tipo de pokémon', () => {
  renderWithRouter(<App />);

  const filtersBtn = screen.getAllByTestId('pokemon-type-button');
  const buttonAll = screen.getByRole('button', { name: 'All' });

  filtersBtn.forEach(({ textContent }, index) => {
    expect(filtersBtn[index]).toHaveTextContent(textContent);
    expect(buttonAll).toBeInTheDocument();
  });
});

test('Teste se os botões dos tipos Fire e Psychic só exibem pokémons desse tipo', () => {
  renderWithRouter(<App />);

  const nextBtn = screen.getByRole('button', { name: /Próximo Pokémon/ });

  ['Fire', 'Psychic'].forEach((btnName) => {
    const button = screen.getByRole('button', { name: btnName });
    userEvent.click(button);
    expect(screen.getByTestId(TYPE_TESTID)).toHaveTextContent(btnName);
    userEvent.click(nextBtn);
    expect(screen.getByTestId(TYPE_TESTID)).toHaveTextContent(btnName);
  });
});

test('Teste se todos os botões só exibem pokémons do seu tipo', () => {
  renderWithRouter(<App />);

  const nextBtn = screen.getByRole('button', { name: /Próximo Pokémon/ });
  const filtersBtn = screen.getAllByTestId('pokemon-type-button');

  filtersBtn.forEach((button) => {
    if (!['Fire', 'Psychic'].includes(button.textContent)) {
      userEvent.click(button);
      expect(screen.getByTestId(TYPE_TESTID)).toHaveTextContent(button.textContent);
      expect(nextBtn).toBeDisabled();
    }
  });
  userEvent.click(screen.getByRole('button', { name: 'All' }));
  expect(screen.getByTestId(TYPE_TESTID)).toHaveTextContent('Electric');
});
