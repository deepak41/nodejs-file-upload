var request = require('request');
var fs = require('fs');
const { sizeof } = require("file-sizeof");
var dayjs = require('dayjs')

var r = request.post({
	url: "http://localhost:3000/file-upload",
	headers: {
		'Content-Length': sizeof.IEC("img/image.jpg").B
	}
});

var upload = fs.createReadStream('img/image.jpg', { highWaterMark: 50000 });

upload.pipe(r);

var bytes_uploaded = 0;
upload.on("data", function (chunk) {
  	bytes_uploaded += chunk.length
  	console.log(dayjs().format('hh:mm:ss SSS [Z] A'), '-', bytes_uploaded, 'Bytes uploaded');
})

upload.on("end", function (res) {
  	console.log('Finished');
});
