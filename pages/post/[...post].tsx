import type { NextPage } from "next";
import styles from "../../styles/Post.module.css";
import { useRouter } from "next/router";
import { Blogpost } from "../../Components/Blogpost";
import { Hierarchy } from "../../Components/Hierarchy";
import { Metadata } from "../../Components/Metadata";

const Home: NextPage = () => {
	const router = useRouter();

	return (
		<div>
			{router.query.post && (
				<div className={styles.container}>
					<Blogpost url={`/api/post/${router.query.post[0]}`} />
					{/* <Metadata url={`/api/metadata/${router.query.post[0]}`} /> */}
					<Hierarchy />
				</div>
			)}
		</div>
	);
};

export default Home;
