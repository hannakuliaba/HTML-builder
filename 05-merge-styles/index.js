const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const dirPath = path.join(__dirname, 'styles');
const promise = fs.promises.readdir(dirPath, { withFileTypes: true });

promise.then(files => {
	for (const file of files) {
		if ((file.isFile()) && (path.extname(file.name) === '.css')) {
			const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
			const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), {flags: 'a'});
			pipeline(readStream, writeStream, (error) => {
				if (error) {
					console.log(error);
				}
			});
		}
	};
}).catch(err => {
	console.log(err);
});