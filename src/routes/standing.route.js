const express = require('express');
const router = express.Router();
const { getLeagueStandings } = require('../controllers/standing.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRole = require('../middlewares/role.middleware');

router.get('/standings',authenticateToken, authorizeRole("Administrator", "Editor"),getLeagueStandings);
module.exports = router;
