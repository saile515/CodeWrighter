import { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");
const path = require("path");

export default async function Handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	return new Promise((resolve, reject) => {
		fs.readFile(
			"./Blogposts\\" + req.query.post[0] + ".html",
			"utf8",
			(err: Error, data: string) => {
				if (err) throw err;
				res.send(data);
				resolve(true);
			}
		);
	});
}
