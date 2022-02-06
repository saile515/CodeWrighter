import styles from "../styles/Blogpost.module.css";
import { PostData } from "./PostBrowser";

export default function Blogpost(props: { metadata: PostData; content: string }) {
	return (
		<div id="blogpost" className={`${styles.container} bg-slate-900 text-gray-400`}>
			<h1>{props.metadata.name}</h1>
			<div dangerouslySetInnerHTML={{ __html: props.content }}></div>
		</div>
	);
}
