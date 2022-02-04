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

	return <div>{posts && <PostTile id={posts[0].id} date={posts[0].date} edits={posts[0].edits} name={posts[0].name} />}</div>;
}
