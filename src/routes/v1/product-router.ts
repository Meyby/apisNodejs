import { Router } from 'express';
import * as productsController from '../../controller/v1/product-controller';

const router = Router();

router.post('/create', productsController.createProduct);
router.get('', productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.put('/:productId', productsController.updateProduct); // Actualizar toda la lista
router.patch('/:productId', productsController.partialUpdateProduct);
router.delete('/:productId', productsController.deleteProductById);
router.post(
  '/:productId/notify-client',
  productsController.updateProductAndNotify
);

export default router;
