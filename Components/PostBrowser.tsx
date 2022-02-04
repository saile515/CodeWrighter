import { useEffect, useState } from "react";
import PostTile from "./PostTile";

export interface PostData {
	id: string;
	date: Date;
	edits: Date[];
	name: string;
}

export default function PostBrowser() {
	const [posts, setPosts] = useState<PostData[]>();

	useEffect(() => {
		fetch("/api/getpost")
			.then((data) => data.json())
			.then((data: PostData[]) => {
				setPosts(data);
			});
	}, []);

	return (
		<div>
			{posts?.map((post: PostData) => (
				<PostTile key={post.id} id={post.id} date={post.date} edits={post.edits} name={post.name} />
			))}
		</div>
	);
}
