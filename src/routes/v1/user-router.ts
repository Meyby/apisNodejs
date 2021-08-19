import { Router } from 'express';
import * as userController from '../../controller/v1/user-controller';

const router = Router();

router.get('', userController.getUsers);
router.post('/create', userController.createUser);
router.get('/:userId', userController.getUserById);
router.delete('/:userId', userController.deleteUserById);
router.post('/login', userController.login)

export default router;
