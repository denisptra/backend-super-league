const express = require('express');
const router = express.Router();
const {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam
} = require('../controllers/team.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const authorizeRole = require('../middlewares/role.middleware');


// CRUD Endpoints
router.get('/teams',authenticateToken, authorizeRole("Administrator", "Editor"), getAllTeams);
router.get('/team/:id',authenticateToken, authorizeRole("Administrator", "Editor"), getTeamById);
router.post('/team/create',authenticateToken, authorizeRole("Administrator", "Editor"), createTeam);
router.put('/team/:id',authenticateToken, authorizeRole("Administrator", "Editor"), updateTeam);
router.delete('/team/:id',authenticateToken, authorizeRole("Administrator", "Editor"), deleteTeam);

module.exports = router;
