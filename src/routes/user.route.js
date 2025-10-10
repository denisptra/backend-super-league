const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, updateUser, getUserById, deleteUser } = require('../controllers/user.controller.js');

router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/user/create', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id',deleteUser);

module.exports = router;
