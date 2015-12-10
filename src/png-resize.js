#!/usr/local/bin/node
import path from 'path';
import lwip from 'lwip';
import commander from 'commander';

let config = require('../package.json');
let cwd = process.cwd();
let sizes = [
	['ldpi', 0.1875],
	['mdpi', 0.25],
	['hdpi', 0.375],
	['xhdpi', 0.5],
	['xxhdpi', 0.75],
	['xxxhdpi', 1]
];

commander
	.version(config.version)
	.option('-i, --input [file]', 'The input file [file]')
	.parse(process.argv);

function batchScale(sizes, index, input) {
	console.log('batch', index);

	if (sizes.length > index) {
		let ext = path.extname(input);
		let basename = path.basename(input, ext);
		let dirname = path.dirname(input);

		let label = sizes[index][0];
		let scale = sizes[index][1];
		let output = path.resolve(dirname, `${basename}-${label}${ext}`);

		lwip.open(input, (err, image) => {
			image
				.batch()
				.scale(scale)
				.writeFile(output, {
					'compression': 'fast',
					'interlaced': true,
					'transparency': 'auto'
				}, err => {
					if (err) {
						console.error(err);
					} else {
						batchScale(sizes, index + 1, input);
					}
				});
		});
	}
}

if (commander.input) {
	let input = path.resolve(cwd, commander.input);
	batchScale(sizes, 0, input);
}