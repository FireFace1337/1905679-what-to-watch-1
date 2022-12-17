import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FormReview from './formReview';

const mockStore = configureMockStore();

const TestApp = (
  <Provider store={mockStore()}>
    <FormReview />
  </Provider>
);

describe('Component: FormReview', () => {
  it('Should render correctly', () => {
    render(TestApp);

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toEqual('Post');
    expect(screen.getAllByRole('radio')).toHaveLength(10);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Should be reacting corect to user actions', async () => {
    render(TestApp);

    await userEvent.type(screen.getByRole('textbox'), 'Test comment');
    expect(screen.getByDisplayValue('Test comment')).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('Rating 5'));
    expect(screen.getByLabelText('Rating 5')).toBeChecked();
  });
});
