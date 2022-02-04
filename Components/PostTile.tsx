import { PostData } from "./PostBrowser";

export default function PostTile(props: PostData) {
	return (
		<div className=" bg-slate-800 text-gray-400 m-2 p-2 rounded-md shadow-md shadow-neutral-900">
			<p className=" text-2xl font-bold text-white">{props.name}</p>
			<p>Written {new Date(props.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
			{props.edits[0] && <p>Edited {new Date(props.edits.slice(-1)[0]).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>}
		</div>
	);
}
