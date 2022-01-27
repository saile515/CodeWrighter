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
		tagArr[i] = tagArr[i]
			.replace(/<([\D])/, "&lt;$1")
			.replace(/([\D])>/, "$1&gt;");

		for (let l = 0; l < mainTags.length; l++) {
			if (new RegExp(`^${mainTags[l].md}\\s`).test(tagArr[i])) {
				tagArr[i] = `<${
					mainTags[l].html
				} id=${crypto.randomUUID()} class="${
					mainTags[l].class ? mainTags[l].class : ""
				}"> ${tagArr[i].replace(mainTags[l].md, "")} </${
					mainTags[l].html
				}>`;
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
            <style>
                * {
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
		            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }

                body {
                    font-size: 2.5vw;
                }

                h1 {
                    font-size: 3em;
                    margin: 0.438em 0;
                    border-bottom: 2px solid #cccccc;
                }

                h2 {
                    font-size: 2em;
                    margin: 0.333em 0;
                }

                h3 {
                    font-size: 1.667em;
                    margin: 0.25em 0;
                }

                h4 {
                    font-size: 1.2em;
                    margin: 0.209em 0;
                }

                h5 {
                    font-size: 1em;
                    margin: 0.15em 0;
                }

                h6 {
                    font-size: 0.833em;
                    margin: 0.125em 0;
                }

                h2 i {
                    color: #777777;
                }

                .oli {
                    list-style-type: none;
                    display: list-item;
                }

                .uli {
                    list-style-type: disc;
                    display: list-item;
                }

                .code, .code * {
                    font-family: Consolas, 'Courier New', monospace !important;
                }

                @media only screen and (max-width: 800px) {
                    body {
                        font-size: 5vw;
                    }

                    h1 {
                    font-size: 2.5em;
                    margin: 0.438em 0;
                    }

                    h2 {
                        font-size: 1.75em;
                        margin: 0.333em 0;
                    }

                    h3 {
                        font-size: 1.5em;
                        margin: 0.25em 0;
                    }

                    h4 {
                        font-size: 1.2em;
                        margin: 0.209em 0;
                    }

                    h5 {
                        font-size: 1em;
                        margin: 0.15em 0;
                    }

                    h6 {
                        font-size: 0.833em;
                        margin: 0.125em 0;
                    }
                }

            </style>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/atom-one-dark.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js"></script>
            <script>hljs.highlightAll();</script>
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

convert(`/${process.argv[2]}.md`);
