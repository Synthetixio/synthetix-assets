const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const synthsInputFolder = path.join(__dirname, '..', 'synths');
const synthsOutputFolder = path.resolve(synthsInputFolder, 'png');

// ignore png directory
const filesToIgnore = 'png';

fs.readdirSync(synthsInputFolder)
	.filter((fileName) => !filesToIgnore.includes(fileName))
	.forEach((fileName) => {
		const fileNameExtPNG = fileName.replace('.svg', '.png');

		sharp(path.resolve(synthsInputFolder, fileName))
			.withMetadata()
			.resize(256, 256)
			.toFile(path.resolve(synthsOutputFolder, fileNameExtPNG))
			.then(() => console.log(`Converting ${fileName} to ${fileNameExtPNG}`))
			.catch((err) =>
				console.log(`Error trying to convert ${fileName} to ${fileNameExtPNG} - ${err}`)
			);
	});
