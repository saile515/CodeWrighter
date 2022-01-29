const fs = require("fs");
const crypto = require("crypto");
require("dotenv").config();

const mainTags = [
	{ md: "#", html: "h1" },
	{ md: "##", html: "h2" },
	{ md: "###", html: "h3" },
	{ md: "####", html: "h4" },
	{ md: "#####", html: "h5" },
	{ md: "######", html: "h6" },
	{ md: "\\*", html: "li", class: "uli" },
	{ md: "\\d", html: "li", class: "oli" },
	{ md: ">", html: "span", class: "blockquote" },
];

const subTags = [
	{ regex: /^\s*$/g, html: "<br/>" },
	{ regex: /(^|\s)\*([^\*\s])/g, html: "$1<i>$2" },
	{ regex: /([^\*\s])\*(?!\S)/g, html: "$1</i>" },
	{ regex: /(^|\s)\*\*([^\*\s])/g, html: "$1<b>$2" },
	{ regex: /([^\*\s])\*\*(?!\S)/g, html: "$1</b>" },
	{ regex: /(^|\s)\*\*\*([^\*\s])/g, html: "$1<b><i>$2" },
	{ regex: /([^\*\s])\*\*\*(?!\S)/g, html: "$1</i></b>" },
	{
		regex: /(^|\s)```([a-zA-Z]{1,})(?!\S)/g,
		html: "$1<pre><code class='language-$2 code'>",
	},
	{ regex: /(^|\s)```(?!\S)/g, html: "$1</code></pre>" },
	{ regex: /\[(.*)\]\((.*)\)/g, html: "<a href='$2' target='_blank'>$1</a>" },
];

async function convert(file) {
	let fileStr = new Promise((resolve, reject) => {
		fs.readFile(`${process.env.MD_INPUT}/${file}`, "utf8", (err, data) => {
			if (err) throw err;
			resolve(data);
		});
	});

	const tagArr = (await fileStr).split("\r\n");
	for (let i = 0; i < tagArr.length; i++) {
		tagArr[i] = tagArr[i].replace(/<([\D])/, "&lt;$1").replace(/([\D])>/, "$1&gt;");

		for (let l = 0; l < mainTags.length; l++) {
			if (new RegExp(`^${mainTags[l].md}\\s`).test(tagArr[i])) {
				tagArr[i] = `<${mainTags[l].html} id=${crypto.randomUUID()} class="${mainTags[l].class ? mainTags[l].class : ""}"> ${tagArr[i].replace(mainTags[l].md, "")} </${mainTags[l].html}>`;
			}
		}

		for (let l = 0; l < subTags.length; l++) {
			tagArr[i] = tagArr[i].replace(subTags[l].regex, subTags[l].html);
		}
	}

	let htmlStr = "";
	for (let i = 0; i < tagArr.length; i++) {
		htmlStr += tagArr[i] + "\n";
	}

	fs.writeFile(
		`${process.env.MD_OUTPUT}/${process.argv[2]}.html`,
		`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="/post.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/atom-one-dark.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js"></script>
        </head>
        <body>
            ${htmlStr}
            <script src="/post.js"></script>
        </body>
        </html>`,
		(err) => {
			if (err) throw err;
		}
	);
}

convert(`/${process.argv[2]}.md`);
