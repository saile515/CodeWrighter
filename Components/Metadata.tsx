import React from "react";
import { metadata } from "../pages/api/metadata/[...metadata]";
import styles from "../styles/Post.module.css";

interface Props {
	url: string;
}

interface State {
	metadata: metadata;
}

export class Metadata extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			metadata: {},
		};
	}

	render() {
		return (
			<div className={styles.metadata}>
				<ul>
					<li className={styles.metadataListItem}>
						<span className={styles.listTopic}>Author: </span>
						<span>{"Elias Jörgensen"}</span>
					</li>
					<li className={styles.metadataListItem}>
						<span className={styles.listTopic}>Date: </span>
						<span>{"31st of January, 2022"}</span>
					</li>
					<li className={styles.metadataListItem}>
						<span className={styles.listTopic}>Edited: </span>
						<span>{"7th of February, 2022"}</span>
					</li>
				</ul>
			</div>
		);
	}
}
