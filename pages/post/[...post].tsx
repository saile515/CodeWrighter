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

	useEffect(() => {
		if (!router.isReady) return;
		fetch(`/api/post/${router.query.post![0]}`)
			.then((data) => data.text())
			.then((data) => {
				setContent(data);
			});
	}, [router.isReady]);

	return (
		<div className={`${styles.container}`}>
			<SideMenu />
			<Blogpost content={content} />
			<TableOfContents />
		</div>
	);
};

export default Home;
