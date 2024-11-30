import mongoose from 'mongoose';

// Transaction schema with custom collection name
const transactionSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // Sender's address or identifier
  recipient: { type: String, required: true }, // Recipient's address or identifier
  amount: { type: Number, required: true }, // Amount of transaction
  transactionId: { type: String, required: true, unique: true }, // Unique transaction ID
  type: { type: String, required: true, enum: ['Deposit', 'Transfer', 'Received'] }, // Transaction type
  date: { type: Date, default: Date.now }, // Date of transaction
}, { 
  timestamps: true,
  collection: 'History' // Custom collection name
});

export default mongoose.model('Transaction', transactionSchema);
