import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingPets', mocksController.getMockingPets);
router.get('/mockingUsers', mocksController.getMockingUsers);
router.post('/generateData', mocksController.generateData);

export default router;