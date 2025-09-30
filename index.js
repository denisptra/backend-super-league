const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const teamsRouter = require('./src/routes/team.route');
const newsRouter = require('./src/routes/news.route');
const matchRoute = require('./src/routes/match.route');
const userRoute = require('./src/routes/user.route');

const cors = require('cors');

app.use(cors());

app.use('/api', teamsRouter, newsRouter, matchRoute, userRoute);


app.use(express.json());

app.use('/', (req, res) => {
    res.send('Halo, dunia!');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});