import Head from "next/head";
import { PostData } from "./PostBrowser";
import styles from "../styles/Blogpost.module.css";

export default function Blogpost(props: { metadata: PostData; content: string }) {
	return (
		<div id="blogpost" className={`${styles.container} bg-slate-900 text-gray-400`}>
			<Head>
				<link rel="stylesheet" href="/hljs.css" />
			</Head>
			<h1>{props.metadata.name}</h1>
			<p className=" text-slate-600 !my-0">
				Written {new Date(props.metadata.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} by {props.metadata.author}
			</p>
			{props.metadata.edits[0] && (
				<p className=" text-slate-600 !my-0">
					(Edited {new Date(props.metadata.edits[props.metadata.edits.length - 1]).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })})
				</p>
			)}
			<div dangerouslySetInnerHTML={{ __html: props.content }}></div>
		</div>
	);
}
