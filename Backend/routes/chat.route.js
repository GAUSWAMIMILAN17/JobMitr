// routes/chat.route.js

import express from "express";
import authenticateToken  from "../middleware/isAuthenticated.js";

import {
  createChat,
  chatMessages,
  getAllChats,
  getSingleChat,
  deleteChat,
  recommendJobs
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/newChat",authenticateToken, createChat);

router.post("/message",authenticateToken, chatMessages);

router.get("/allChats",authenticateToken, getAllChats);

router.get("/singleChat/:id",authenticateToken, getSingleChat);

router.delete("/delete/:id",authenticateToken, deleteChat);

router.get("/aiRecommendations",authenticateToken, recommendJobs);

export default router;