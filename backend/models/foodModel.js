import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ["veg", "non-veg"], required: true }, // NEW FIELD
    topDish: { type: Boolean, default: false } 
});

// Fix model creation line
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
