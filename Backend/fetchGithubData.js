import "dotenv";

import fetch from "node-fetch";

export async function fetchCommits() {
	return new Promise((resolve, reject) => {
		fetch(`https://api.github.com/users/${process.env.GITHUB}/events`)
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				resolve(data);
			});
	});
}
