import {getAllProduct,getProductId} from '../src/database';
import { ProductService } from '../src/product_service';

jest.mock('../src/database.js');

test('mock modules getProductById', () => {
  getProductId.mockImplementation((id) => ({id, name: 'Product Name'}))
  const product = ProductService.findById(1);

  expect(product).toEqual({
    id: 1,
    name: 'Product Name'
  })
});

test('mock modules getAllProduct', () => {
  const products = [
    {
      id: 1, name: 'Product Name'
    },
    {
      id: 2, name: 'Product Name'
    },
  ];

  getAllProduct.mockImplementation(() => {
    return products;
  })

  expect(ProductService.findAll()).toEqual(products);
});