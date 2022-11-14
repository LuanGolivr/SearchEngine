import {Router, Request, Response} from 'express';
import * as mainController from '../controllers/mainController'

const router = Router();

router.get('/', mainController.home);
router.get('/search', mainController.search);

export default router;