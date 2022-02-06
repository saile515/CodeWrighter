import { ReactElement, useEffect, useState } from "react";
import styles from "../styles/TableOfContents.module.css";

interface HeadingInterface {
	id: string;
	name: string;
	body?: HeadingInterface[];
}

function nextUntil(element: Element | null, selector: string, depth: number, filter?: string) {
	var siblings = [];
	element = element!.nextElementSibling;

	while (element) {
		if (element.matches(selector)) break;

		if (filter && !element.matches(filter)) {
			element = element.nextElementSibling;
			continue;
		}

		siblings.push(element);
		element = element.nextElementSibling;
	}

	return createHeadingStructure(siblings as HTMLHeadingElement[], depth);
}

function createHeadingStructure(headings: HTMLHeadingElement[], depth: number) {
	const headingStructure: HeadingInterface[] = [];

	headings.forEach((heading) => {
		if (heading.nodeName == `H${depth}`) {
			headingStructure.push({ id: heading.id, name: heading.innerText, body: nextUntil(heading, `H${depth}`, depth + 1) });
		}
	});

	return headingStructure;
}

function getHeadings() {
	const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
	const structure = createHeadingStructure(headings as HTMLHeadingElement[], 1);
	return structure;
}

function createTableOfContents(structure: HeadingInterface[], depth: number) {
	const headings: ReactElement[] = [];
	structure.forEach((heading) => {
		headings.push(
			<li key={heading.id}>
				<a
					className={` transition-all duration-300 hover:pl-2 ${depth == 1 ? "font-bold text-xl text-white" : " text-slate-400"}`}
					href={`#${heading.id}`}
					onClick={(event) => {
						event.preventDefault();
						document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
					}}>
					{heading.name}
				</a>
				{heading.body && <ul className=" pl-4 list-none">{createTableOfContents(heading.body, depth + 1)}</ul>}
			</li>
		);
	});

	return <ul className=" pl-4 list-none">{headings}</ul>;
}

export default function TableOfContents(props: { ready: boolean }) {
	const [structure, setStructure] = useState<HeadingInterface[]>();

	useEffect(() => {
		setStructure(getHeadings());
	}, [props.ready]);
	return <nav className={`${styles.container} bg-slate-900 border-l-2 border border-solid border-slate-800`}>{structure && createTableOfContents(structure as HeadingInterface[], 1)}</nav>;
}
