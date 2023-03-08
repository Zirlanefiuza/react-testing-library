import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

test('Teste se o texto "Page request not found', () => {
  render(<NotFound />);

  const text = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });

  expect(text).toBeInTheDocument();
});

test('Teste: Há uma tag img na página com o src desejado', () => {
  render(<NotFound />);

  const foundImg = screen.getByRole('img');

  expect(foundImg).toBeInTheDocument();
  expect(foundImg).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
