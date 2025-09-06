import fs from 'fs';
import path from 'path';
import foodModel from '../models/foodModel.js';

// ➕ Add food item
const addFood = async (req, res) => {
  let image_filename = req.file?.filename;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    type: req.body.type, // NEW: veg / non-veg
    image: image_filename,
    topDish: req.body.topDish === 'true' || req.body.topDish === true,
  });

  try {
    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error adding food' });
  }
};

// 📋 All food list
const listFood = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type; // optional filter: veg / non-veg

    const foods = await foodModel.find(filter);
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error fetching food' });
  }
};

// ❌ Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) return res.json({ success: false, message: 'Food not found' });

    // delete image file
    if (food.image) {
      const filePath = path.join('uploads', food.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error removing food' });
  }
};

// 🔍 Get food by ID
const getFoodById = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) return res.json({ success: false, message: 'Food not found' });

    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error fetching food' });
  }
};

// ✏️ Edit food item
const editFood = async (req, res) => {
  try {
    const { name, description, price, category, type, topDish } = req.body; // include type
    const food = await foodModel.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }

    // if new image uploaded, delete old one
    if (req.file) {
      if (food.image) {
        const oldPath = path.join('uploads', food.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      food.image = req.file.filename;
    }

    // update fields
    food.name = name;
    food.description = description;
    food.price = price;
    food.category = category;
    food.type = type; // NEW: update veg / non-veg
    food.topDish = topDish === 'true' || topDish === true;

    await food.save();

    res.json({ success: true, message: 'Food updated successfully', data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error updating food' });
  }
};

export { addFood, listFood, removeFood, getFoodById, editFood };
