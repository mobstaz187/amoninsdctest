import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  username: String,
  avatar: String,
  unlockedCharacters: [String]
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);