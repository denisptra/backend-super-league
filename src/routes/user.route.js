const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, updateUser, getUserById, deleteUser } = require('../controllers/user.controller.js');
const authenticateToken = require('../middlewares/auth.middleware.js');
const authorizeRole = require('../middlewares/role.middleware.js');

router.get('/users',authenticateToken, authorizeRole("Administrator"), getAllUsers);
router.get('/user/:id',authenticateToken, authorizeRole("Administrator"), getUserById);
router.post('/user/create',authenticateToken, authorizeRole("Administrator"), createUser);
router.put('/user/:id',authenticateToken, authorizeRole("Administrator"), updateUser);
router.delete('/user/:id',authenticateToken, authorizeRole("Administrator"), deleteUser);

module.exports = router;
