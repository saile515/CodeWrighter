import { ReactElement, useEffect, useState } from "react";

import { NextPage } from "next";
import { PostData } from "../../components/PostBrowser";
import PostTile from "../../components/PostTile";
import SideMenu from "../../components/SideMenu";
import styles from "../../styles/Search.module.css";
import { useRouter } from "next/router";

interface SearchItem {
	id: string;
	rank: number;
	metadata: PostData;
}

const Search: NextPage = () => {
	const router = useRouter();
	const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
	const [results, setResults] = useState<ReactElement[]>([]);

	useEffect(() => {
		if (!router.isReady) return;
		setResults([]);
		fetch(`/api/search/${router.query.search[0]}`)
			.then((data) => data.json())
			.then((data) => {
				for (const prop in data) {
					fetch(`/api/metadata/${prop}`)
						.then((metadata) => metadata.json())
						.then((metadata) => {
							setSearchItems((prevState) => [...prevState, { id: prop, rank: data[prop], metadata: metadata }]);
							setResults((prevArray) => [...prevArray, <PostTile key={metadata.id} id={metadata.id} name={metadata.name} date={metadata.date} edits={metadata.edits} />]);
						});
				}
			});
	}, [router.isReady, router.query.search]);

	useEffect(() => {
		if (results.length < 2) return;
		results.sort((a, b) => {
			if (searchItems.find((item) => item.id == a.key).rank < searchItems.find((item) => item.id == b.key).rank) return -1;
			else return 1;
		});
		results.reverse();
	}, [results.length]);

	return (
		<div className={styles.container}>
			<SideMenu />
			<div className="grid grid-rows-[4rem_1fr] bg-slate-900">
				<p className="text-3xl border-b-2 border-slate-800 my-0 mx-4 text-slate-400 leading-[4rem]">
					{results.length} results for &quot;{router.query.search}&quot;
				</p>
				<div className={`${styles.browser} grid gap-4 p-4 auto-rows-[15rem]`}>{results}</div>
			</div>
		</div>
	);
};

export default Search;
