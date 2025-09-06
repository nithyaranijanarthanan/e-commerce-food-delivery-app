import express from 'express';
import multer from 'multer';
import { addFood, listFood, removeFood, getFoodById, editFood } from '../controllers/foodController.js';

const foodRouter = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Routes
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);
foodRouter.get('/:id', getFoodById);               // ✅ fetch single food
foodRouter.put('/edit/:id', upload.single('image'), editFood); // ✅ update

export default foodRouter;
