// __tests__/example.test.js

import { render, screen } from '@testing-library/react';
import Home from '../pages/index'; // Adjust the import path based on your structure

describe('Home Page', () => {
  it('renders the heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /welcome/i }); // Replace with actual text
    expect(heading).toBeInTheDocument();
  });
});