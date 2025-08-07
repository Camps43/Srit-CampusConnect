const mongoose = require('mongoose');

const clubHeadSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('ClubHead', clubHeadSchema);
