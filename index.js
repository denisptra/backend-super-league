require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./src/routes/user.route.js');
const newsRouter = require('./src/routes/news.route.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Halo, dunia!');
});

app.use('/api', userRouter);

app.use('/api', newsRouter);

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});

//test nnti hapus
/*
import express from "express";
import cors from "cors";
import newsRoutes from "./src/routes/news.route.js";
import userRoutes from "./src/routes/user.route.js";

const app = express();
app.use(cors());
app.use(express.json());

// Daftarkan kedua route
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
*/
