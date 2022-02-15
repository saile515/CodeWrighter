import type { NextPage } from "next";
import PostBrowser from "../Components/PostBrowser";
import SideMenu from "../Components/SideMenu";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<SideMenu />
			<div className="grid grid-rows-[4rem_1fr] bg-slate-900">
				<h1 className="text-5xl border-b-2 border-slate-800 my-0 mx-4 text-slate-400 leading-[4rem]">codewrighter.com</h1>
				<PostBrowser />
			</div>
		</div>
	);
};

export default Home;
