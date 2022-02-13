import { useEffect, useState } from "react";

interface Commit {
	sha: string;
	author: string;
	message: string;
	distinct: boolean;
	url: string;
	repo: string;
	date: Date;
}

function GitHubItem(props: { data: Commit }) {
	return (
		<li className=" bg-slate-800 p-2 my-1 rounded-lg">
			<p className=" text-white m-0 font-bold overflow-ellipsis whitespace-nowrap overflow-hidden">{props.data.message}</p>
			<p className=" m-0 text-slate-500">
				By {props.data.author} in {props.data.repo}
			</p>
			<p className=" m-0 text-slate-500">{new Date(props.data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
		</li>
	);
}

export default function GitHubFeed() {
	const [commits, setCommits] = useState<Commit[]>([]);
	useEffect(() => {
		fetch("/api/getcommits")
			.then((data) => data.json())
			.then((data) => {
				setCommits(data);
			});
	}, []);
	return (
		<div className="grid col-auto">
			<p className=" text-slate-600">Github Feed</p>
			<ul className=" overflow-auto scrollbar-none">
				{commits.map((commit) => (
					<GitHubItem key={commit.sha} data={commit} />
				))}
			</ul>
		</div>
	);
}
