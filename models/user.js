const mongoose = require('mongoose'),
	  { Schema }= mongoose

const userSchema = new Schema({
	googleId: String
})

mongoose.model('users', userSchema)