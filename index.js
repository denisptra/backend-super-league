require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRouter = require('./src/routes/user.route.js');
const newsRouter = require('./src/routes/news.route.js');
const teamRouter = require('./src/routes/team.route.js');
const matchRouter = require('./src/routes/match.route.js');
const authRouter = require('./src/routes/auth.route.js');
const standingRouter = require('./src/routes/standing.route.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Halo, dunia!');
});

app.use('/api/auth', authRouter);
app.use('/api', userRouter);
app.use('/api', newsRouter);
app.use('/api', teamRouter);
app.use('/api', matchRouter);
app.use('/api', standingRouter);

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
