import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../../../store/uiSlice';
import ThemeSwitcher from '../ThemeSwitcher';

function renderWithStore() {
  const store = configureStore({ reducer: { ui: uiReducer } });
  return render(
    <Provider store={store}>
      <ThemeSwitcher />
    </Provider>,
  );
}

describe('ThemeSwitcher', () => {
  it('renders the palette toggle button', () => {
    renderWithStore();
    expect(screen.getByRole('button', { name: /palette/i })).toBeInTheDocument();
  });

  it('dropdown is not visible initially', () => {
    renderWithStore();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens dropdown when button is clicked', async () => {
    renderWithStore();
    await userEvent.click(screen.getByRole('button', { name: /palette/i }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('shows all 5 palette options', async () => {
    renderWithStore();
    await userEvent.click(screen.getByRole('button', { name: /palette/i }));
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(5);
  });

  it('closes dropdown when Escape is pressed', async () => {
    renderWithStore();
    await userEvent.click(screen.getByRole('button', { name: /palette/i }));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
