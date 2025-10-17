const express = require('express');
const router = express.Router();
const { createNews, getAllNews, getNewsrById, updateNews, deleteNews } = require('../controllers/news.controller.js');

router.post('/news/create', createNews);
router.get('/news', getAllNews);
router.get('/news/:id', getNewsrById);
router.put('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);

module.exports = router;

//test nnti hapus
/*
import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
const router = express.Router();

// GET semua berita
router.get("/", async (req, res) => {
  try {
    const news = await prisma.news.findMany();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tambah berita baru
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNews = await prisma.news.create({
      data: { title, content },
    });
    res.json(newNews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
*/
//test 2 nnti hapus
/*
import express from "express";
import { getAllNews, createNews } from "../controllers/newsController.js";
const router = express.Router();

router.get("/", getAllNews);
router.post("/", createNews);

export default router;
*/
