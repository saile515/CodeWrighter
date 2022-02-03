const fs = require("fs");
const crypto = require("crypto");
const { marked } = require("marked");
require("dotenv").config();

async function createPost(post) {
	let file = new Promise((resolve, reject) => {
		fs.readFile(`${process.env.MD_INPUT}/${post}.md`, "utf8", (err, data) => {
			if (err) throw err;
			resolve(data);
		});
	});

	const database = new Promise((resolve, reject) => {
		fs.readFile(`./Database/posts.json`, "utf8", (err, data) => {
			if (err) throw err;
			resolve(JSON.parse(data));
		});
	});

	let uuid;

	if (/^---\nuuid:\s([a-zA-Z0-9\-]*)\n---\n/g.test(await file)) {
		uuid = (await file).replace(/^---\nuuid:\s([a-zA-Z0-9\-]*)\n---\n[\s\S]*/g, "$1");
		file = (await file).replace(/^---\nuuid:\s([a-zA-Z0-9\-]*)\n---\n/g, "");
		(await database).posts
			.find((post) => {
				return post.id == uuid;
			})
			.edits.push(new Date());
		fs.writeFile("./Database/posts.json", JSON.stringify(await database, null, 4), null, (err) => {
			if (err) throw err;
		});
	} else {
		uuid = crypto.randomUUID();
		(await database).posts.push({ id: uuid, data: new Date(), edits: [] });
		fs.writeFile("./Database/posts.json", JSON.stringify(await database, null, 4), null, (err) => {
			if (err) throw err;
		});
		fs.writeFile(`${process.env.MD_INPUT}/${post}.md`, `---\nuuid: ${uuid}\n---\n\n${await file}`, null, (err) => {
			if (err) throw err;
		});
	}

	const html = marked.parse(await file);

	fs.writeFile(`${process.env.MD_OUTPUT}/${uuid}.txt`, html, null, (err) => {
		if (err) throw err;
	});
}

createPost("test");
