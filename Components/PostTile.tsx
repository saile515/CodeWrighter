import { PostData } from "./PostBrowser";

export default function PostTile(props: PostData) {
	return (
		<div>
			<p>{props.name}</p>
			<p>{props.date.toString()}</p>
			<p>{props.edits.toString()}</p>
		</div>
	);
}
