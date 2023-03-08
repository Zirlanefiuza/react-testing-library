import { render, screen } from '@testing-library/react';
import { About } from '../pages';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  render(<About />);

  const text = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
  expect(text).toBeInTheDocument();
});

test('Teste se a página contém uma tag img com o src', () => {
  render(<About />);

  const image = screen.getByRole('img', { name: 'Pokédex' });
  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
