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
			tagArr[i] = `<h1>${tagArr[i].replace("#", "")} </h1>`;
		} else if (/^##\s/.test(tagArr[i])) {
			tagArr[i] = `<h2>${tagArr[i].replace("##", "")} </h2>`;
		} else if (/^###\s/.test(tagArr[i])) {
			tagArr[i] = `<h3>${tagArr[i].replace("###", "")} </h3>`;
		} else if (/^####\s/.test(tagArr[i])) {
			tagArr[i] = `<h4>${tagArr[i].replace("####", "")} </h4>`;
		} else if (/^#####\s/.test(tagArr[i])) {
			tagArr[i] = `<h5>${tagArr[i].replace("#####", "")} </h5>`;
		} else if (/^######\s/.test(tagArr[i])) {
			tagArr[i] = `<h6>${tagArr[i].replace("######", "")} </h6>`;
		} else if (/^>\s/.test(tagArr[i])) {
			tagArr[i] = `<span class="blockquote">${tagArr[i].replace(
				">",
				""
			)} </span>`;
		} else if (/^\d\.\s/.test(tagArr[i])) {
			tagArr[i] = `<li class="oli">${tagArr[i]} </li>`;
		} else if (/^\*\s/.test(tagArr[i])) {
			tagArr[i] = `<li class="uli">${tagArr[i].replace(/\*/, "")} </li>`;
		}

		tagArr[i] = tagArr[i]
			.replace(/^\s*$/g, "<br/>")
			.replace(/(\s)\*([^\*\s])/g, "$1<i>$2")
			.replace(/([^\*\s])\*(?!\S)/g, "$1</i>")
			.replace(/(\s)\*\*([^\*\s])/g, "$1<b>$2")
			.replace(/([^\*\s])\*\*(?!\S)/g, "$1</b>")
			.replace(/(\s)\*\*\*([^\*\s])/g, "$1<b><i>$2")
			.replace(/([^\*\s])\*\*\*(?!\S)/g, "$1</i></b>");
	}

	let htmlStr = "";
	for (let i = 0; i < tagArr.length; i++) {
		htmlStr += tagArr[i] + "\n";
	}

	fs.writeFile(
		`${process.env.MD_OUTPUT}/file.html`,
		`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .oli {
            list-style-type: none;
            display: list-item;
        }

        .uli {
            list-style-type: disc;
            display: list-item;
        }
    </style>
</head>
<body>
    ${htmlStr}
</body>
</html>`,
		(err) => {
			if (err) throw err;
		}
	);
}

convert("/test.md");
