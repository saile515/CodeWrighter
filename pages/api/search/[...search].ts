import { NextApiRequest, NextApiResponse } from "next";

import { PostData } from "../../../Components/PostBrowser";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise(async (resolve, reject) => {
		// Separate query into keywords
		const query = req.query.search[0].split(" ");
		const posts: Promise<PostData[]> = new Promise((resolve, reject) => {
			fs.readFile(`${process.env.DATABASE}/posts.json`, "utf-8", (err, data) => {
				if (err) throw err;
				resolve(JSON.parse(data).posts);
			});
		});

		const results: any = {};
		for (let i = 0; i < (await posts).length; ++i) {
			fs.readFile(`${process.env.DATABASE}/PostsOutput/${(await posts)[i].id}.txt`, "utf8", async (err, data) => {
				for (let l = 0; l < query.length; ++l) {
					// Check if post contains keywords
					if (`${data} ${(await posts)[i].name}`.toLocaleLowerCase().includes(query[l].toLocaleLowerCase())) {
						// If item is not initialized, initialize it
						if (!results[(await posts)[i].id]) results[(await posts)[i].id] = 0;

						// Add instances of keyword to results object
						results[(await posts)[i].id] += `${data} ${(await posts)[i].name}`.toLocaleLowerCase().match(new RegExp(query[l].toLocaleLowerCase(), "g")).length;
					}
					if ((await posts).length - 1 == i && query.length - 1 == l) {
						res.send(results);
						resolve(true);
					}
				}
			});
		}
	});
}
