const userController = require('../../controller/v1/user-controller');
const productsController = require('../../controller/v1/product-controller');

const createRoutesV1 = (app) => {
  app.get('/api/v1/users', userController.getUsers);
  app.get('/api/v1/users/:userId', userController.getUserById);
  app.get('/api/v1/products', productsController.getProducts);
  app.get('/api/v1/products/:productId', productsController.getProductById);
  app.post('/api/v1/products/create', productsController.createProduct);
};

module.exports = createRoutesV1;
