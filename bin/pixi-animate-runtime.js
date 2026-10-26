#!/usr/bin/env node
'use strict';

var readline = require('readline');
var generator = require('../dist/generator.cjs.js');

// Questions are asked only in a terminal: run from a script or CI, the defaults are used
var ask = process.stdin.isTTY ? function (question) {
	return new Promise(function (resolve) {
		var rl = readline.createInterface({ input: process.stdin, output: process.stdout });
		rl.question(question, function (answer) {
			rl.close();
			resolve(answer);
		});
	});
} : undefined;

generator.runCli(process.argv.slice(2), {
	stdout: function (text) { process.stdout.write(text); },
	stderr: function (text) { process.stderr.write(text); },
	ask: ask
}).then(function (code) {
	process.exitCode = code;
}, function (error) {
	process.stderr.write((error && error.stack ? error.stack : String(error)) + '\n');
	process.exitCode = 2;
});
