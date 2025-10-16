const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, updateUser, getUserById, deleteUser } = require('../controllers/user.controller.js');

router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/user/create', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id',deleteUser);

module.exports = router;

//test nnti hapus
/*
import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
const router = express.Router();

// GET semua user
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tambah user
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
*/