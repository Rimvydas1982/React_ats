import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const votesSchema = Schema({
  team_id: {
    type: String,
    required: true,
  },
  vote: {
    type: Number,
    required: true,
  },
});

const Votes = mongoose.model('votes', votesSchema);
export default Votes;
