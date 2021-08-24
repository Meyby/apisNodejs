import { Router } from 'express';
import * as productsController from '../../controller/v1/product-controller';
import { checkAut } from '../../middlewares/auth-middleware';

const router = Router();

router.get('', checkAut, productsController.getProducts);
router.post('/create', checkAut, productsController.createProduct);
router.get('', checkAut, productsController.getProducts);
router.get('/:productId', checkAut, productsController.getProductById);
router.put('/:productId', checkAut, productsController.updateProduct); // Actualizar toda la lista
router.patch('/:productId', checkAut, productsController.partialUpdateProduct);
router.delete('/:productId', checkAut, productsController.deleteProductById);
router.post(
  '/:productId/notify-client', checkAut,
  productsController.updateProductAndNotify
);

export default router;
