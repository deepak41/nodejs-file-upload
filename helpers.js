const fs = require('fs');


exports.uploadFile = (req, filePath) => {
	return new Promise((resolve, reject) => {
		const total = parseInt(req.headers['content-length']);
		const stream = fs.createWriteStream(filePath);

		console.log('Stream open ...  0.00%');
		req.pipe(stream);

		// Drain is fired whenever a data chunk is written.
		stream.on('drain', () => {
			const written = parseInt(stream.bytesWritten);
			const pWritten = ((written / total) * 100).toFixed(2);
			console.log(`Processing  ...  ${pWritten}% done`);
		});

		// When the stream is finished, print a final message
		stream.on('close', () => {
			console.log('Processing  ...  100% - Finished');
			resolve(filePath);
		});

		// If something goes wrong, reject the promise
		stream.on('error', err => {
			console.error(err);
			reject(err);
		});
	});
};
