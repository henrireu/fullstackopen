const mongoose = require('mongoose')

// favorite genre ei toimi mutta muuten toimii käyttäjätoiminto


const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String
  },
})

module.exports = mongoose.model('User', schema)