import express from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

/**
 * POST /api/contact            -> Save contact form message
 * GET  /api/contact            -> Get all contact messages (admin)
 * GET  /api/contact/info       -> Get public contact information
 */

// POST (save contact message from user)
router.post("/", async (req, res) => {
  console.log("BODY:", req.body);
  const { name, email, message } = req.body;
  const newMessage = new ContactMessage({ name, email, message });
  await newMessage.save();
  res.json(newMessage);
});

// GET (list all messages - admin)
router.get("/", async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

// GET public contact information (frontend)
router.get("/info", (req, res) => {
  res.json({
    phone: "98765 43210",
    email: "support@example.com",
    address: "123 Main Street, Chennai",
  });
});

export default router;
// 