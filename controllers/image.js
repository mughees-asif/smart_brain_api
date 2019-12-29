const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'd863b0fb6d7443a19b789735385ac260'
});

const handleAPICall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to find the API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleAPICall
}