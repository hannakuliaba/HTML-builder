const fs = require('fs');
const path = require('path');
const newDirectory = path.join(__dirname, 'files-copy');
const promise = fs.promises.readdir(path.join(__dirname, 'files'));

fs.mkdir(newDirectory, { recursive: true }, (error) => {
	if (error) {
		console.log(error);
	}
	promise.then(files => {
		for (const file of files) {
			fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', path.basename(file)), (error) => {
				if (error) {
					console.log(error);
				}
			});
		};
	}).catch(err => {
		console.log(err);
	});
});