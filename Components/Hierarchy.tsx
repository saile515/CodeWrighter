import React from "react";
import styles from "../styles/Post.module.css";

function split(str: string, tag: string) {
	const titles: string[] = str.split(new RegExp(`<${tag}\s.*>.*</${tag}>`));
	const tagArr = [];
	if (!titles[0].match(new RegExp(`<${tag}.*>.*</${tag}>`))) {
		return [];
	}
	for (let i = 0; i < titles.length; i++) {
		const body = titles[i]!.toString()
			.replace(new RegExp(`<${tag}.*>.*</${tag}>(.*)`, "gm"), "$1")
			.replace(/[\s\n]*(.*)[\s\s]*/gm, "$1");
		const title = titles[i]!.match(new RegExp(`<${tag}.*>.*</${tag}>`))![0]
			.toString()
			.replace(new RegExp(`<${tag}.*>(.*)</${tag}>`, "gm"), "$1")
			.replace(/[\s\n]*(.*)[\s\S]*/g, "$1");

		tagArr.push({ title: title, body: body });
	}

	return tagArr;
}

interface HierarchyInterface {
	title: string;
	body: HierarchyInterface[];
}

interface HierarchyProps {}

interface HierarchyState {
	hierarchy: HierarchyInterface;
}

export class Hierarchy extends React.Component<HierarchyProps, HierarchyState> {
	constructor(props: HierarchyProps) {
		super(props);
	}
	componentDidMount() {
		const blogpost = document!.getElementById(
			"blogpost"
		)! as HTMLIFrameElement;

		blogpost.addEventListener("load", () => {
			const hierarchy: HierarchyInterface = { title: "", body: [] };

			const h1 = split(
				blogpost.contentWindow!.document.body.innerHTML,
				"h1"
			);

			hierarchy.title = h1[0].title;

			const h2 = split(h1[0].body, "h2");

			if (h2[0])
				for (let a = 0; a < h1.length; a++) {
					hierarchy.body[a] = { title: h2[a].title, body: [] };

					const h3 = split(h2[a].body, "h3");

					if (h3[0])
						for (let b = 0; b < h2.length; b++) {
							hierarchy.body[a].body[b] = {
								title: h3[b].title,
								body: [],
							};

							const h4 = split(h3[b].body, "h4");

							if (h4[0])
								for (let c = 0; c < h3.length; c++) {
									hierarchy.body[a].body[b].body[c] = {
										title: h4[c].title,
										body: [],
									};

									const h5 = split(h4[c].body, "h5");

									if (h5[0])
										for (let d = 0; d < h5.length; d++) {
											hierarchy.body[a].body[b].body[
												c
											].body[d] = {
												title: h5[d].title,
												body: [],
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
														};
												}
										}
								}
						}
				}

			console.log(hierarchy);
		});
	}

	render() {
		return <div className={styles.hierarchy}></div>;
	}
}
