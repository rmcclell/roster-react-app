import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders roster app bar', () => {
  render(<App />);
  const heading = screen.getByText(/roster/i);
  expect(heading).toBeInTheDocument();
});
