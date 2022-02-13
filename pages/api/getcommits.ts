import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const commits = new Promise((resolve, reject) => {
		fetch(`${process.env.DATABASE}/commits`)
			.then((data) => data.json())
			.then((data) => {
				resolve(data);
			});
	});

	res.send(await commits);
}
