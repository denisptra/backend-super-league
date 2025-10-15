const express = require('express');
const router = express.Router();
const {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
} = require('../controllers/match.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRole = require('../middlewares/role.middleware');

router.get('/matches',authenticateToken, authorizeRole("Administrator", "Editor"), getAllMatches);
router.get('/match/:id',authenticateToken, authorizeRole("Administrator", "Editor"), getMatchById);
router.post('/match/create',authenticateToken, authorizeRole("Administrator", "Editor"), createMatch);
router.put('/match/:id',authenticateToken, authorizeRole("Administrator", "Editor"), updateMatch);
router.delete('/match/:id',authenticateToken, authorizeRole("Administrator", "Editor"), deleteMatch);

module.exports = router;
