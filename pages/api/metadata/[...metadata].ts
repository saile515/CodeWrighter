import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const posts = new Promise((resolve, reject) => {
		fs.readFile("./Database/posts.json", "utf8", (err, data) => {
			if (err) throw err;
			let json = JSON.parse(data);
			const metadata = json.posts.find((post: any) => post.id == req.query.metadata[0]);
			resolve(metadata);
		});
	});

	res.send(await posts);
}
