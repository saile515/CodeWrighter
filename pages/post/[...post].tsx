import type { NextPage } from "next";
import styles from "../../styles/Post.module.css";
import { useRouter } from "next/router";
import SideMenu from "../../Components/SideMenu";
import Blogpost from "../../Components/Blogpost";
import TableOfContents from "../../Components/TableOfContents";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
	const router = useRouter();
	const [content, setContent] = useState("");
	const [metadata, setMetadata] = useState({ id: "", name: "", date: new Date(), edits: [] });
	const [contentReady, setContentReady] = useState(false);
	const [metaReady, setMetaReady] = useState(false);

	useEffect(() => {
		if (!router.isReady) return;
		fetch(`/api/post/${router.query.post![0]}`)
			.then((data) => data.text())
			.then((data) => {
				setContent(data);
				setContentReady(true);
			});
		fetch(`/api/metadata/${router.query.post![0]}`)
			.then((data) => data.json())
			.then((data) => {
				setMetadata(data);
				setMetaReady(true);
			});
	}, [router.isReady]);

	return (
		<div className={`${styles.container}`}>
			<SideMenu />
			<Blogpost content={content} metadata={metadata} />
			<TableOfContents ready={contentReady && metaReady} />
		</div>
	);
};

export default Home;
