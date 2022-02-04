const fs = require("fs");
const crypto = require("crypto");
const { marked } = require("marked");
require("dotenv").config();

async function createPost(post) {
	// Read post file
	let file = new Promise((resolve, reject) => {
		fs.readFile(`${process.env.MD_INPUT}/${post}.md`, "utf8", (err, data) => {
			if (err) throw err;
			resolve(data);
		});
	});

	// Read data file
	const database = new Promise((resolve, reject) => {
		fs.readFile(`./Database/posts.json`, "utf8", (err, data) => {
			if (err) throw err;
			resolve(JSON.parse(data));
		});
	});

	// Initialize uuid
	let uuid;

	// Check if post exists by looking for metadata
	if (/^---\nuuid:\s([a-zA-Z0-9\-]*)\n---\n/g.test(await file)) {
		// If post exists, edit the file, and push the date
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
		// If post does not exist, create post
		uuid = crypto.randomUUID();
		(await database).posts.push({ id: uuid, date: new Date(), edits: [], name: (await file).match(/^#\s.*/g)[0].replace("# ", ""), author: process.env.AUTHOR });
		fs.writeFile("./Database/posts.json", JSON.stringify(await database, null, 4), null, (err) => {
			if (err) throw err;
		});
		fs.writeFile(`${process.env.MD_INPUT}/${post}.md`, `---\nuuid: ${uuid}\n---\n\n${await file}`, null, (err) => {
			if (err) throw err;
		});
	}

	const html = marked.parse(await file, { headerIds: false });

	// Write data to txt file
	fs.writeFile(`${process.env.MD_OUTPUT}/${uuid}.txt`, html, null, (err) => {
		if (err) throw err;
	});
}

createPost(`/${process.argv[2]}`);
