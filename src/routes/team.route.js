const express = require('express');
const router = express.Router(); 
const teamsController = require('../controllers/teams.controller');

router.get('/teams', teamsController.getAllTeams);
router.get('/team/:id', teamsController.getTeamsById);
// router.post('/', teamsController.createTeams);
// router.put('/:id', teamsController.updateTeams);
// router.delete('/:id', teamsController.deleteTeams);



module.exports = router;