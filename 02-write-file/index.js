const fs = require('fs');
const path = require('path');
const event = require("events");
class Exit extends event.EventEmitter { }
const exitEvent = new Exit();
const { stdin, stdout } = process;
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(`Hello! Please enter the text...\n`);
rl.prompt();

rl.on('line', (data) => {
	if (data.toString().trim() === 'exit') {
		exitEvent.emit('exit');
	};
	writeStream.write(data);
});

rl.on('SIGINT', sayGoodBye);
exitEvent.on('exit', sayGoodBye);

function sayGoodBye() {
	stdout.write('Thank you, have a nice day!\n');
	process.exit();
};