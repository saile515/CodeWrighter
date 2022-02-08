import styles from "../styles/SideMenu.module.css";
import GitHubFeed from "./GitHubFeed";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import SocialList from "./SocialList";

export default function SideMenu() {
	return (
		<div className={`${styles.container} bg-slate-900 border-r-2 border border-solid border-slate-800 overflow-y-auto`}>
			<SearchBar />
			<Navigation />
			<GitHubFeed />
			<SocialList />
		</div>
	);
}
