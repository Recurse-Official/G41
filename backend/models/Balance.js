// models/Balance.js
import mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
  address: { type: String, required: true },
  balance: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const Balance = mongoose.model('Balance', balanceSchema);

// Export the model as the default export
export default Balance;
