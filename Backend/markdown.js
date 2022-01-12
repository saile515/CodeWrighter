const fs = require("fs");
require("dotenv").config();

async function convert(file) {
	let fileStr = new Promise((resolve, reject) => {
		fs.readFile(`${process.env.MD_INPUT}/${file}`, "utf8", (err, data) => {
			if (err) throw err;
			resolve(data);
		});
	});

	const tagArr = (await fileStr).split("\r\n");
	for (let i = 0; i < tagArr.length; i++) {
		if (/^#\s/.test(tagArr[i])) {
			tagArr[i] = `<h1>${tagArr[i].replace("#", "")} <h1/>`;
		} else if (/^##\s/.test(tagArr[i])) {
			tagArr[i] = `<h2>${tagArr[i].replace("##", "")} <h2/>`;
		}

		tagArr[i] = tagArr[i]
			.replace(/(\s)\*([^\*\s])/g, "$1<i>$2")
			.replace(/([^\*\s])\*(?!\S)/g, "$1<i/>")
			.replace(/(\s)\*\*([^\*\s])/g, "$1<b>$2")
			.replace(/([^\*\s])\*\*(?!\S)/g, "$1<b/>");
	}
	console.log(tagArr);
}

convert("/test.md");
