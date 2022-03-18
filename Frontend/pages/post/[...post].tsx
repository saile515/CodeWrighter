import { useEffect, useState } from "react";

import Blogpost from "../../components/Blogpost";
import type { NextPage } from "next";
import SideMenu from "../../components/SideMenu";
import TableOfContents from "../../components/TableOfContents";
import styles from "../../styles/Post.module.css";
import { useRouter } from "next/router";

const Post: NextPage = () => {
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

export default Post;
