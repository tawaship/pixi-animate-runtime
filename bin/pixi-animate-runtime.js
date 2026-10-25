#!/usr/bin/env node
'use strict';

var generator = require('../dist/generator.cjs.js');

process.exitCode = generator.runCli(process.argv.slice(2), {
	stdout: function (text) { process.stdout.write(text); },
	stderr: function (text) { process.stderr.write(text); }
});
