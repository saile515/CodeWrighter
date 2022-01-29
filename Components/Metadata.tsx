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
		return <div className={styles.metadata}>Hello</div>;
	}
}
