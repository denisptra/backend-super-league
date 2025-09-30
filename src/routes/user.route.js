const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Misal middleware auth dan isAdmin sudah ada

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);

// Hanya admin yang bisa create, update, dan delete user
// router.post('/', userController.createUser);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;