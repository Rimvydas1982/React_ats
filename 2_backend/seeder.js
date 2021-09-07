import mongoose from 'mongoose';
import Team from './models/teamModel.js';
import Votes from './models/votesModel.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    // let team = [
    //   {
    //     name: 'FK Banga',
    //     location: 'Gargzdai',

    //     email: 'jonas@gmail.com',
    //     password: '123',
    //   },
    //   {
    //     name: 'FK Zalgirs',
    //     location: 'Kaunas',
    //     email: 'petras@gmail.com',
    //     password: '124',
    //   },
    //   {
    //     name: 'Fbk Kaunas',
    //     location: 'Kaunas',

    //     email: 'antanas@gmail.com',
    //     password: '125',
    //   },
    //   {
    //     name: 'FK Panevezys',
    //     location: 'Panevezys',

    //     email: 'kazys@gmail.com',
    //     password: '126',
    //   },
    // ];

    let votes = [
      { team_id: '6137af9fd1a1ac03f00b7cdb', vote: 0 },
      { team_id: '6137af9fd1a1ac03f00b7cdc', vote: 0 },
      { team_id: '6137af9fd1a1ac03f00b7cdd', vote: 0 },
      { team_id: '6137af9fd1a1ac03f00b7cde', vote: 0 },
    ];

    // Team.insertMany(team);
    Votes.insertMany(votes);

    console.log('Data sended to MongoDB');
  });
