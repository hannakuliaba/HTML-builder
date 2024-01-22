const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');
const promise = fs.promises.readdir(dirPath, { withFileTypes: true });

promise.then(files => {
	for (const file of files) {
		if (file.isFile()) {
			fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
				if (err) {
					console.log(err);
				}
				const fileName = path.basename(file.name, path.extname(file.name));
				const fileExt = path.extname(file.name);
				console.log(`${fileName} - ${fileExt.slice(1)} - ${stats.size}`);
			});
		};
	};
}).catch(err => {
	console.log(err);
});
