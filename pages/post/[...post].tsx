import type { NextPage } from "next";
import styles from "../../styles/Post.module.css";
import { useRouter } from "next/router";
import { Blogpost } from "../../Components/Blogpost";

const Home: NextPage = () => {
	const router = useRouter();

	return (
		<div className={styles.container}>
			{router.query.post && (
				<Blogpost url={`/api/post/${router.query.post[0]}`} />
			)}
		</div>
	);
};

export default Home;
