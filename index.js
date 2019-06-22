const express = require('express'),
	  mongoose = require('mongoose'),
	  keys = require('./config/keys'),
	  cookieSession = require('cookie-session'),
	  passport = require('passport');
	  require('./models/user')
	  require('./services/passport');
	 
const app = express();

mongoose.connect(keys.mongoURI);
// mongoose.connect('mongodb://localhost/emaily');

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
)

app.use(passport.initialize());
app.use(passport.session());
api.use(restify.plugins.queryParser({ mapParams: false }));

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('server running'));