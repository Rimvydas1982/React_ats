import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import Team from './models/teamModel.js';
import Votes from './models/votesModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Connecting DB
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log(`Connected to MongoDB`.grey.underline.bold);
    // Starting server
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}...`.yellow.underline.bold)
    );
  });

// Routes
app.get('/', (req, res) => res.send('Dashboard API is running...'));

//Get votes
app.get('/api/votes', (req, res) => {
  Votes.find({}).then((data) => res.json(data));
});

// Get all teams with votes
app.get('/api/teamsvotes', async (req, res) => {
  let teams = await Team.find({});
  let votes = await Votes.find({});

  let teamsAndvotes = teams.reduce((total, team) => {
    let teamVotes = votes.filter((vote) => vote.team_id === '' + team._id);

    total.push({ ...team.toObject(), vote: [...teamVotes] });

    return total;
  }, []);

  res.json(teamsAndvotes);
});
