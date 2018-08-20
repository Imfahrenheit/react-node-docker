const mongoose = require('mongoose');
const bookmarkSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  repoId: { type: String, required: true },
  name: { type: String, required: true },
  repo_url: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema)