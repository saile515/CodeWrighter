import "dotenv/config";

import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise((resolve, reject) => {
		fetch(`${process.env.DATABASE}/post/${req.query.post[0]}`)
			.then((data) => data.text())
			.then((data) => {
				res.send(data);
				resolve(true);
			});
	});
}
