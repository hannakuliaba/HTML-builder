const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'styles');
const promise = fs.promises.readdir(dirPath, { withFileTypes: true });
const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

promise.then(files => {
	for (const file of files) {
		if ((file.isFile()) && (path.extname(file.name) === '.css')) {
			const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
			readStream.on('data', (data) => {
				writeStream.write(data);
			});
		}
	};
}).catch(err => {
	console.log(err);
});