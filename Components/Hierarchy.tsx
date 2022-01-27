import Link from "next/link";
import React, { ReactElement } from "react";
import styles from "../styles/Post.module.css";

function split(str: string, tag: string) {
	const titles: string[] = str.split(new RegExp(`(<${tag}.*>.*</${tag}>)`));
	titles.shift();

	const length = Math.floor(titles.length / 2);

	for (let i = 0; i < length; i++) {
		titles[i + 1] = titles[i] + titles[i + 1];
		titles.splice(i, 1);
	}

	if (titles[0] && !titles[0].match(new RegExp(`<${tag}.*>.*</${tag}>`))) {
		return [];
	}

	const tagArr = [];
	for (let i = 0; i < titles.length; i++) {
		const body = titles[i]!.replace(
			new RegExp(`<${tag}.*>.*</${tag}>(.*)`, "gm"),
			"$1"
		);

		const id = titles[i]!.match(
			new RegExp(`<${tag}.*id="([a-f0-9\-]*)".*>.*</${tag}>`, "gm")
		)![0].replace(/.*id="([a-f0-9\-]*)".*/gm, "$1");

		const title = titles[i]!.match(new RegExp(`<${tag}.*>.*</${tag}>`))![0]
			.replace(/\n/g, "")
			.replace(new RegExp(`<${tag}.*>(.*)</${tag}>`, "gm"), "$1");

		tagArr.push({ title: title, body: body, id: id });
	}

	return tagArr;
}

interface HierarchyInterface {
	title: string;
	id: string;
	body: HierarchyInterface[];
}

interface HierarchyProps {}

interface HierarchyState {
	hierarchy: ReactElement;
}

export class Hierarchy extends React.Component<HierarchyProps, HierarchyState> {
	constructor(props: HierarchyProps) {
		super(props);

		this.state = {
			hierarchy: <div></div>,
		};
	}
	componentDidMount() {
		const blogpost = document!.getElementById(
			"blogpost"
		)! as HTMLIFrameElement;

		blogpost.addEventListener("load", () => {
			const hierarchy: HierarchyInterface = {
				title: "",
				body: [],
				id: "",
			};

			const h1 = split(
				blogpost.contentWindow!.document.body.innerHTML,
				"h1"
			);

			hierarchy.title = h1[0].title;
			hierarchy.id = h1[0].id;

			const h2 = split(h1[0].body, "h2");

			if (h2[0])
				for (let a = 0; a < h2.length; a++) {
					hierarchy.body[a] = {
						title: h2[a].title,
						body: [],
						id: h2[a].id,
					};

					const h3 = split(h2[a].body, "h3");

					if (h3[0])
						for (let b = 0; b < h3.length; b++) {
							hierarchy.body[a].body[b] = {
								title: h3[b].title,
								body: [],
								id: h3[b].id,
							};

							const h4 = split(h3[b].body, "h4");

							if (h4[0])
								for (let c = 0; c < h4.length; c++) {
									hierarchy.body[a].body[b].body[c] = {
										title: h4[c].title,
										body: [],
										id: h4[c].id,
									};

									const h5 = split(h4[c].body, "h5");

									if (h5[0])
										for (let d = 0; d < h5.length; d++) {
											hierarchy.body[a].body[b].body[
												c
											].body[d] = {
												title: h5[d].title,
												body: [],
												id: h5[d].id,
											};

											const h6 = split(h5[d].body, "h6");

											if (h6[0])
												for (
													let e = 0;
													e < h6.length;
													e++
												) {
													hierarchy.body[a].body[
														b
													].body[c].body[d].body[e] =
														{
															title: h6[e].title,
															body: [],
															id: h6[e].id,
														};
												}
										}
								}
						}
				}

			const listH2: ReactElement[] = [];

			for (let a = 0; a < hierarchy.body.length; a++) {
				const listH3: ReactElement[] = [];
				listH2.push(
					<div key={a}>
						<li
							className={`${styles.h2} ${styles.hierarchyElement}`}
							onClick={() => {
								blogpost.contentWindow?.document
									.getElementById(hierarchy.body[a].id)
									?.scrollIntoView({ behavior: "smooth" });
							}}
						>
							{hierarchy.body[a].title}
						</li>
						<ul>{listH3}</ul>
					</div>
				);

				for (let b = 0; b < hierarchy.body[a].body.length; b++) {
					const listH4: ReactElement[] = [];
					listH3.push(
						<div key={b}>
							<li
								className={`${styles.h3} ${styles.hierarchyElement}`}
								onClick={() => {
									blogpost.contentWindow?.document
										.getElementById(
											hierarchy.body[a].body[b].id
										)
										?.scrollIntoView({
											behavior: "smooth",
										});
								}}
							>
								{hierarchy.body[a].body[b].title}
							</li>
							<ul>{listH4}</ul>
						</div>
					);

					for (
						let c = 0;
						c < hierarchy.body[a].body[b].body.length;
						c++
					) {
						const listH5: ReactElement[] = [];
						listH4.push(
							<div key={c}>
								<li
									className={`${styles.h4} ${styles.hierarchyElement}`}
									onClick={() => {
										blogpost.contentWindow?.document
											.getElementById(
												hierarchy.body[a].body[b].body[
													c
												].id
											)
											?.scrollIntoView({
												behavior: "smooth",
											});
									}}
								>
									{hierarchy.body[a].body[b].body[c].title}
								</li>
								<ul>{listH5}</ul>
							</div>
						);

						for (
							let d = 0;
							d < hierarchy.body[a].body[b].body[c].body.length;
							d++
						) {
							const listH6: ReactElement[] = [];
							listH5.push(
								<div key={d}>
									<li
										className={`${styles.h5} ${styles.hierarchyElement}`}
										onClick={() => {
											blogpost.contentWindow?.document
												.getElementById(
													hierarchy.body[a].body[b]
														.body[c].body[d].id
												)
												?.scrollIntoView({
													behavior: "smooth",
												});
										}}
									>
										{
											hierarchy.body[a].body[b].body[c]
												.body[d].title
										}
									</li>
									<ul>{listH6}</ul>
								</div>
							);

							for (
								let e = 0;
								e <
								hierarchy.body[a].body[b].body[c].body[d].body
									.length;
								e++
							) {
								listH6.push(
									<li
										key={e}
										className={`${styles.h6} ${styles.hierarchyElement}`}
										onClick={() => {
											blogpost.contentWindow?.document
												.getElementById(
													hierarchy.body[a].body[b]
														.body[c].body[d].body[e]
														.id
												)
												?.scrollIntoView({
													behavior: "smooth",
												});
										}}
									>
										{
											hierarchy.body[a].body[b].body[c]
												.body[d].body[e].title
										}
									</li>
								);
							}
						}
					}
				}
			}

			this.setState({
				hierarchy: (
					<ul>
						<li
							className={`${styles.h1} ${styles.hierarchyElement}`}
							onClick={() => {
								blogpost.contentWindow?.document
									.getElementById(hierarchy.id)
									?.scrollIntoView({ behavior: "smooth" });
							}}
						>
							{hierarchy.title}
						</li>
						<ul>{listH2}</ul>
					</ul>
				),
			});
		});
	}

	render() {
		return <div className={styles.hierarchy}>{this.state.hierarchy}</div>;
	}
}
