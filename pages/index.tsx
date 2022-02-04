import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import PostBrowser from "../Components/PostBrowser";
import SideMenu from "../Components/SideMenu";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<SideMenu />
			<PostBrowser />
		</div>
	);
};

export default Home;
