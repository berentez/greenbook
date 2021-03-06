import express from 'express';
import cors from 'cors';
import {
  bookController,
  loginController,
  readingController,
  registrationController,
  searchController,
} from '../controllers';
import authenticateToken from '../middlewares/authenticate-token';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/registration', registrationController.post);
router.post('/login', loginController.post);

router.use(authenticateToken);
router.post('/search', searchController.post);
router.get('/books', bookController.get);
router.post('/books', bookController.post);

router.post('/reading', readingController.post);
router.put('/reading', readingController.put);
router.delete('/reading', readingController.delete);

export default router;
