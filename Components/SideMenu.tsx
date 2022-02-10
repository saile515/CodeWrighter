import { useEffect, useState } from "react";

import GitHubFeed from "./GitHubFeed";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import SocialList from "./SocialList";
import styles from "../styles/SideMenu.module.css";

export default function SideMenu() {
	const [open, setOpen] = useState<boolean>(false);
	const mobileThreshold = 800;
	const [screen, setScreen] = useState<{ width: number; height: number; aspect: number }>({ width: 0, height: 0, aspect: 0 }),
		screenHeight: number = 0;

	function handleClick() {
		setOpen(!open);
	}

	useEffect(() => {
		setScreen({ width: window.innerWidth, height: window.innerHeight, aspect: window.innerWidth / window.innerHeight });

		window.addEventListener("resize", () => {
			setScreen({ width: window.innerWidth, height: window.innerHeight, aspect: window.innerWidth / window.innerHeight });
		});
	}, []);

	return (
		<div className={`${styles.container} bg-slate-900 border-r-2 border border-solid border-slate-800 z-10 ${open ? " left-0" : " overflow-visible left-[-80vw]"}`}>
			{screen.width < mobileThreshold && (
				<button onClick={handleClick} className={` text-xl bg-slate-800 rounded-lg z-50 text-slate-400 w-8 h-8 ${open ? " justify-self-end" : " absolute right-[-3rem] top-4 opacity-80"}`}>
					{open ? "✖" : "···"}
				</button>
			)}
			{!open && screen.width < mobileThreshold ? <div></div> : ""}

			<SearchBar />
			<Navigation />
			<GitHubFeed />
			<SocialList />
		</div>
	);
}
