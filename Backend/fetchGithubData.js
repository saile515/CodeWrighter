import "dotenv/config";

import fetch from "node-fetch";

export async function fetchCommits() {
	return new Promise((resolve, reject) => {
		fetch(`https://api.github.com/users/${process.env.GITHUB}/events`)
			.then((data) => data.json())
			.then((data) => {
				const commits = [];
				for (const event in data) {
					if (data[event].type != "PushEvent") continue;

					for (const commitIndex in data[event].payload.commits) {
						if (data[event].payload.commits[commitIndex].author.name != process.env.GITHUB) continue;
						const commit = data[event].payload.commits[commitIndex];
						commit.repo = data[event].repo.name;
						commits.push(commit);
					}
				}
				resolve(commits);
			});
	});
}
