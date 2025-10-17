const express = require('express');
const router = express.Router();
const { getAllNews,getNewsById, createNews, updateNews, deleteNews } = require('../controllers/news.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRole = require('../middlewares/role.middleware');

router.get('/news', getAllNews);
router.get('/news/:id', getNewsById);
router.post('/news/create', authenticateToken, authorizeRole("Administrator", "Writer"), createNews);
router.patch('/news/:id', authenticateToken, authorizeRole("Administrator", "Writer"), updateNews);
router.delete('/news/:id',authenticateToken, authorizeRole("Administrator", "Writer"), deleteNews);

module.exports = router;