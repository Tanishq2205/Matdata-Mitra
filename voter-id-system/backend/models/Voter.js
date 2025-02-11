import mongoose from 'mongoose';

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  aadhar: {
    type: String,
    required: true,
    unique: true
  },
  ipfsHash: {
    type: String,
    required: true
  },
  walletAddress: {
    type: String,
    required: true
  },
  voterId: {
    type: String,
    unique: true
  }
}, { timestamps: true });

// Export as default
export default mongoose.model('Voter', voterSchema);