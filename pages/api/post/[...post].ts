import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise((resolve, reject) => {
		fs.readFile(`${process.env.MD_OUTPUT}/${req.query.post[0]}.txt`, "utf8", (err, data) => {
			if (err) throw err;
			res.send(data);
			resolve(true);
		});
	});
}
