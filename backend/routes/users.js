import express from 'express';
import { User } from '../models/User.js';

export const router = express.Router();

// Get user data
router.get('/:discordId', async (req, res) => {
  try {
    const user = await User.findOne({ discordId: req.params.discordId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update user
router.post('/', async (req, res) => {
  try {
    const { discordId, username, avatar } = req.body;
    let user = await User.findOne({ discordId });
    
    if (!user) {
      user = new User({
        discordId,
        username,
        avatar,
        unlockedCharacters: []
      });
    } else {
      user.username = username;
      user.avatar = avatar;
    }
    
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add unlocked character
router.post('/:discordId/characters', async (req, res) => {
  try {
    const { characterName } = req.body;
    const user = await User.findOne({ discordId: req.params.discordId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.unlockedCharacters.includes(characterName)) {
      user.unlockedCharacters.push(characterName);
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});