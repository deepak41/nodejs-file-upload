const app = require('express')();
const helpers = require('./helpers');


app.get('/', (req, res) => {
	res.status(200).send(`Server up and running!`);
});

app.post('/file-upload', (req, res) => {
	const filePath = 'img/uploaded-file.jpg';
	helpers.uploadFile(req, filePath)
		.then(path => res.send({ status: 'success', path }))
		.catch(err => res.send({ status: 'error', err }));
});

// Start server
app.listen(3000, () => console.log("The server is running at localhost:3000"));
