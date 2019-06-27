const requireLogin = require('../middlewares/requireLogin'),
	  requireCredits = require('../middlewares/requireCredits'),
	  mongoose = require('mongoose'),
	  Mailer = require('../services/Mailer'),
	  surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting!')
	})

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.body.id,
			dateSent: Date.now()
		})

		try {
			const mailer = new Mailer(survey, surveyTemplate(survey)) 
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(422).send(err)
		}
	})
}
