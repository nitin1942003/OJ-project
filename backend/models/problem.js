import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  }
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  testCases: {
    type: [testCaseSchema],
    required: false,
    default: []
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: false,
  }
});

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;