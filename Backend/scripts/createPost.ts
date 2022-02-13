import "dotenv/config";

import { exit } from "process";
import fs from "fs";
import hljs from "highlight.js";
import { marked } from "marked";
import { randomUUID } from "crypto";

interface Post {
	id: string;
	date: Date;
	edits: Date[];
	name: string;
	author: string;
}

async function createPost(post: string) {
	// Read post file
	let file: Promise<string> | string = new Promise((resolve, reject) => {
		fs.readFile(`${process.env.DATABASE}/PostsInput/${post}.md`, "utf8", (err, data) => {
			if (err) throw err;
			resolve(data);
		});
	});

	// Read data file
	const database: Promise<{ posts: Post[] }> = new Promise((resolve, reject) => {
		fs.readFile(`${process.env.DATABASE}/posts.json`, "utf8", (err, data) => {
			if (err) throw err;
			resolve(JSON.parse(data));
		});
	});

	// If file doesn't container hading, error.
	if (!(await file).match(/^#\s.*/gm)) {
		console.error("File doesn't container heading!");
		exit();
	}

	// Initialize uuid
	let uuid: string;

	// Check if post exists by looking for metadata
	if (/^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s.test(await file)) {
		// If post exists, edit the file, and push the date
		uuid = (await file).replace(/^(?:\-\-\-)(.*?)uuid:\s([a-f0-9\-]*)(.*?)(?:\-\-\-|\.\.\.).*/s, "$2");
		file = (await file).replace(/^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s, "");
		(await database).posts
			.find((post) => {
				return post.id == uuid;
			})
			.edits.push(new Date());
		fs.writeFile(`${process.env.DATABASE}/posts.json`, JSON.stringify(await database, null, 4), null, (err) => {
			if (err) throw err;
		});
	} else {
		// If post does not exist, create post
		uuid = randomUUID();
		(await database).posts.push({ id: uuid, date: new Date(), edits: [], name: (await file).match(/^#\s.*/gm)[0].replace("# ", ""), author: process.env.AUTHOR });
		fs.writeFile(`${process.env.DATABASE}/posts.json`, JSON.stringify(await database, null, 4), null, (err) => {
			if (err) throw err;
		});
		fs.writeFile(`${process.env.DATABASE}/PostsInput/${post}.md`, `---\nuuid: ${uuid}\n---\n\n${await file}`, null, (err) => {
			if (err) throw err;
		});
	}

	file = (await file).replace(/^#\s.*/gm, "");

	marked.setOptions({
		renderer: new marked.Renderer(),
		highlight: function (code, lang) {
			const language = hljs.getLanguage(lang) ? lang : "plaintext";
			return hljs.highlight(code, { language }).value;
		},
		langPrefix: "hljs language-",
	});
	const html = marked.parse(file);

	// Write data to txt file
	fs.writeFile(`${process.env.DATABASE}/PostsOutput/${uuid}.txt`, html, null, (err) => {
		if (err) throw err;
		console.log("Post rendered");
	});
}

createPost(`/${process.argv[2]}`);
