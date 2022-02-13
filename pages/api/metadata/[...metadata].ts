import "dotenv/config";

import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const posts = new Promise((resolve, reject) => {
		fetch(`${process.env.DATABASE}/posts`)
			.then((data) => data.json())
			.then((data) => {
				const metadata = data.posts.find((post: any) => post.id == req.query.metadata[0]);
				resolve(metadata);
			});
	});

	res.send(await posts);
}
