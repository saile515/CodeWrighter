import "dotenv/config";

import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const posts = new Promise((resolve, reject) => {
		fs.readFile(`${process.env.DATABASE}/posts.json`, "utf8", (err, data) => {
			if (err) throw err;
			let json = JSON.parse(data);
			const metadata = json.posts.find((post: any) => post.id == req.query.metadata[0]);
			resolve(metadata);
		});
	});

	res.send(await posts);
}
