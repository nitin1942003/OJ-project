import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const solvedProblemSchema = new mongoose.Schema({
  problemId: {
    type: Schema.Types.ObjectId,
    ref: 'Problem', // Assuming the Problem model is named 'Problem'
    required: true,
  },
  status: {
    type: String, // P for all testcase passed, F for fail, A for attempting 
    required: true,
  },
  testCasesPassed: {
    type: Number, // Number of test cases passed
    required: true,
  },
  totalTestCases: {
    type: Number, // Total number of test cases (from Problem model)
    required: true,
  },
  code: {
    type: String, // Code submitted for the problem
    required: false,
  },
}); 

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  solvedProblems: {
    type: [solvedProblemSchema],
    default: [],
  },
});

const User = mongoose.model('User', userSchema);
export default User;
