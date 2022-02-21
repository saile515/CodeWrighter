import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const posts = new Promise((resolve, reject) => {
		fetch(`${process.env.DATABASE}/posts`)
			.then((data) => data.json())
			.then((data: any) => {
				resolve(data.posts);
			});
	});

	res.send(await posts);
}
