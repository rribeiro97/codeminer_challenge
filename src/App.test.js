import React from 'react'
import { render } from '@testing-library/react'

import App from '../src/App';
import ProductContainer from './containers/ProductContainer/ProductContainer';
import CartContainer from './containers/CartContainer/CartContainer';

describe('Contacts APP', () => {
  it('Should render APP', async () => {
    const { getByTestId } = render(<App/>);
    const appContainer = getByTestId('app');
    expect(appContainer).toHaveClass('app');
    expect(appContainer.children.length).toBe(2);
  });
  it('Should render ProductContainer', async  () => {
    await ( async() => {
      const { getByTestId } = render(<ProductContainer/>);
      const container = getByTestId('product-container');
      expect(container).toHaveClass('ProductContainer');
      expect(container.children.length).toBe(4);
    });
  });
  it('Should render CartContainerContainer', async  () => {
    await ( async() => {
      const { getByTestId } = render(<CartContainer/>);
      const container = getByTestId('cart-container');
      expect(container).toHaveClass('CartContainer');
      expect(container.children.length).toBe(4);
      expect(container.children[0]).toHaveClass('CartContainer__title');
      expect(container.children[1]).toHaveClass('CartContainer__products');
      expect(container.children[2]).toHaveClass('CartContainer__voucher');
      expect(container.children[3]).toHaveClass('CartContainer__valuesInformation');
    });
  });
});