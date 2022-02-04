import { PostData } from "./PostBrowser";

export default function PostTile(props: PostData) {
	return (
		<div className=" bg-slate-800 text-gray-400 p-2 rounded-md shadow-[0_1rem_1.5rem_-0.8rem] shadow-neutral-900 relative">
			<p className=" text-2xl font-bold text-white">{props.name}</p>
			<p>Written {new Date(props.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
			{props.edits[0] && <p>Edited {new Date(props.edits.slice(-1)[0]).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>}
			<p className=" text-slate-700 bottom-2 right-2 absolute">{props.id}</p>
		</div>
	);
}
