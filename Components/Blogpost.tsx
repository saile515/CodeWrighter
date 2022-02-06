import styles from "../styles/Blogpost.module.css";

export default function Blogpost(props: { content: string }) {
	return <div id="blogpost" dangerouslySetInnerHTML={{ __html: props.content }} className={`${styles.container} bg-slate-900 text-gray-400`}></div>;
}
