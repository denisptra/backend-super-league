const express = require('express');
const router = express.Router();
const { createNews, getAllNews, getNewsrById, updateNews, deleteNews } = require('../controllers/news.controller.js');

router.post('/news/create', createNews);
router.get('/news', getAllNews);
router.get('/news/:id', getNewsrById);
router.put('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);

module.exports = router;