import { ReactElement, useEffect, useState } from "react";

import Link from "next/link";
import { PostData } from "./PostBrowser";

export default function Navigation() {
	const [recentPosts, setRecentPosts] = useState<ReactElement[]>();
	const navItemTW = "text-slate-400 text-xl whitespace-nowrap text-ellipsis overflow-hidden transition-[padding] duration-300 hover:pl-2";

	useEffect(() => {
		fetch("/api/getpost")
			.then((data) => data.json())
			.then((data: PostData[]) => {
				data.reverse();
				data.splice(3);
				setRecentPosts(
					data.map((post) => (
						<li className={navItemTW} key={post.id}>
							<Link href={`/post/[post]`} as={`/post/${post.id}`}>
								<a>{post.name}</a>
							</Link>
						</li>
					))
				);
			});
	}, []);

	return (
		<div className=" overflow-hidden">
			<p className=" text-slate-600 pl-4">Navigation</p>
			<ul className=" list-none p-0 pl-4 my-2">
				<li className={navItemTW}>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li className={navItemTW}>
					<Link href="/">
						<a>About</a>
					</Link>
				</li>
				<li className={navItemTW}>
					<Link href="/">
						<a>Collaboration</a>
					</Link>
				</li>
			</ul>
			<p className=" text-slate-600 pl-4">Recent posts</p>
			<ul className=" list-none p-0 pl-4 my-2">{recentPosts}</ul>
		</div>
	);
}
