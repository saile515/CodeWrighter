import { useEffect, useState } from "react";

import GitHubFeed from "./GitHubFeed";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import SocialList from "./SocialList";
import styles from "../styles/SideMenu.module.css";

export default function SideMenu() {
	const [open, setOpen] = useState<boolean>(false);
	const [screen, setScreen] = useState<{ width: number; height: number; aspect: number }>({ width: 0, height: 0, aspect: 0 });
	const mobileThreshold = 800;

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
		<div className=" sticky self-start top-0 z-50">
			{!open && screen.width < mobileThreshold && screen.aspect < 8 / 10 ? (
				<button onClick={handleClick} className=" text-xl bg-slate-800 rounded-lg z-50 text-slate-400 w-8 h-8 fixed right-4 top-4 opacity-80">
					···
				</button>
			) : (
				""
			)}
			<div className={`${styles.container} bg-slate-900 border-r-2 border border-solid border-slate-800 z-50 overflow-y-auto ${open ? "left-0" : "left-[-80vw]"}`}>
				{screen.width < mobileThreshold && screen.aspect < 8 / 10 ? (
					<button onClick={handleClick} className={` text-xl bg-slate-800 rounded-lg z-50 text-slate-400 w-8 h-8 justify-self-end`}>
						✖
					</button>
				) : (
					""
				)}

				<SearchBar />
				<Navigation />
				<GitHubFeed />
				<div></div>
				<SocialList />
			</div>
		</div>
	);
}
