import "dotenv/config";

import fetch from "node-fetch";
import fs from "fs";

const fetchInterval = 1000 * 60 * 1;

interface Commit {
	sha: string;
	author: string | { name: string; email: string };
	message: string;
	distinct?: boolean;
	url: string;
	repo?: string;
	date?: Date;
}

interface GithubEvent {
	id: string;
	type: string;
	actor: {
		id: number;
		login: string;
		display_login: string;
		gravatar_id: string;
		url: string;
		avatar_url: string;
	};
	repo: {
		id: number;
		name: string;
		url: string;
	};
	payload: {
		push_id: number;
		size: number;
		distinct_size: number;
		ref: string;
		head: string;
		before: string;
		commits: Commit[];
	};
	public: boolean;
	created_at: Date;
}

export async function fetchCommits(): Promise<Commit[]> {
	return fetch(`https://api.github.com/users/${process.env.GITHUB}/events`)
		.then((data) => {
			return data.json() as Promise<GithubEvent[]>;
		})
		.then((data) => {
			const commits = [];
			for (const event in data) {
				if (data[event].type != "PushEvent") continue;

				for (const commitIndex in data[event].payload.commits) {
					if ((data[event].payload.commits[commitIndex].author as { name: string; email: string }).name != process.env.GITHUB) continue;
					const commit = data[event].payload.commits[commitIndex];
					commit.author = (commit.author as { name: string; email: string }).name;
					commit.repo = data[event].repo.name;
					commit.date = data[event].created_at;
					commit.url = `https://www.github.com/${commit.repo}/commit/${commit.sha}`;
					commits.push(commit);
				}
			}
			return commits;
		});
}

export function fetchData(): void {
	setInterval(async () => {
		const commits = await fetchCommits();
		fs.writeFile(`${process.env.DATABASE}/commits.json`, JSON.stringify(commits, null, 4), null, (err) => {
			if (err) throw err;
		});
	}, fetchInterval);
}
