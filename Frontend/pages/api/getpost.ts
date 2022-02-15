import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const posts = new Promise((resolve, reject) => {
		fetch(`${process.env.DATABASE}/posts`)
			.then((data) => data.json())
			.then((data) => {
				resolve(data.posts);
			});
	});

	res.send(await posts);
}
