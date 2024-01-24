const fs = require('fs');
const path = require('path');
const newDirectory = path.join(__dirname, 'files-copy');
const promise = fs.promises.readdir(path.join(__dirname, 'files'));

fs.promises.readdir(path.join(__dirname, 'files-copy')).then(files => {
	for (const file of files) {
		fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
		});
	};
	copyFiles();
}).catch(error => {
	fs.mkdir(newDirectory, { recursive: true }, (error) => {
		if (error) {
			console.log(error);
		}
	});
	copyFiles();
});

function copyFiles() {
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
};