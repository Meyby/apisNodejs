import { Application } from 'express';
import * as userController from '../../controller/v1/user-controller';
import * as productsController from '../../controller/v1/product-controller';

const createRoutesV1 = (app: Application): void => {
  app.post('/api/v1/users/create', userController.createUser);
  app.post('/api/v1/products/create', productsController.createProduct);
  app.get('/api/v1/users', userController.getUsers);
  app.get('/api/v1/users/:userId', userController.getUserById);
  app.get('/api/v1/products', productsController.getProducts);
  app.get('/api/v1/products/:productId', productsController.getProductById);
  app.put('/api/v1/products/:productId', productsController.updateProduct); // Actualizar toda la lista
  app.patch(
    '/api/v1/products/:productId',
    productsController.partialUpdateProduct
  );
  app.delete(
    '/api/v1/products/:productId',
    productsController.deleteProductById
  );
};
export default createRoutesV1;
