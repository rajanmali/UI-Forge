import { render, screen, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer, { addToast } from '../../../store/uiSlice';
import ToastContainer from '../Toast';

function makeStore() {
  return configureStore({ reducer: { ui: uiReducer } });
}

function renderWithStore(store = makeStore()) {
  return render(
    <Provider store={store}>
      <ToastContainer />
    </Provider>,
  );
}

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing when there are no toasts', () => {
    renderWithStore();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders a toast when dispatched to the store', () => {
    const store = makeStore();
    renderWithStore(store);
    act(() => {
      store.dispatch(addToast({ type: 'success', message: 'Saved!' }));
    });
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  it('renders all four toast types', () => {
    const types = ['success', 'error', 'warning', 'info'] as const;
    for (const type of types) {
      const store = makeStore();
      const { unmount } = render(
        <Provider store={store}>
          <ToastContainer />
        </Provider>,
      );
      act(() => {
        store.dispatch(addToast({ type, message: type }));
      });
      expect(screen.getByText(type)).toBeInTheDocument();
      unmount();
    }
  });

  it('removes toast after the default 4s duration', () => {
    const store = makeStore();
    renderWithStore(store);
    act(() => {
      store.dispatch(addToast({ type: 'info', message: 'Auto-dismiss' }));
    });
    expect(screen.getByText('Auto-dismiss')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(4100);
    });
    expect(screen.queryByText('Auto-dismiss')).not.toBeInTheDocument();
  });

  it('removes toast immediately when dismiss button is clicked', () => {
    const store = makeStore();
    renderWithStore(store);
    act(() => {
      store.dispatch(addToast({ type: 'success', message: 'Click to dismiss' }));
    });
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
    expect(screen.queryByText('Click to dismiss')).not.toBeInTheDocument();
  });

  it('renders multiple toasts simultaneously', () => {
    const store = makeStore();
    renderWithStore(store);
    act(() => {
      store.dispatch(addToast({ type: 'success', message: 'First' }));
      store.dispatch(addToast({ type: 'error', message: 'Second' }));
    });
    expect(screen.getAllByRole('alert')).toHaveLength(2);
  });
});
