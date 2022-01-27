import React from "react";
import styles from "../styles/Post.module.css";

interface Props {
	url: string;
}

interface State {
	height: string;
}

export class Blogpost extends React.Component<Props, State> {
	constructor(props: Props, context: any) {
		super(props);
		this.state = {
			height: "0px",
		};
	}

	render() {
		return (
			<iframe
				id="blogpost"
				className={styles.post}
				height={this.state.height}
				src={this.props.url}
				onLoad={() => {
					const obj = document.getElementById("blogpost") as HTMLIFrameElement;
					this.setState({
						height: obj.contentWindow!.document.body.scrollHeight + 80 + "px",
					});
				}}></iframe>
		);
	}
}
