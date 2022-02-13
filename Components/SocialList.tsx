import Image from "next/image";
import styles from "../styles/SocialList.module.css";

export default function SocialList() {
	const socialTW = " w-8";
	return (
		<div className=" flex justify-evenly">
			<a className={`${socialTW} ${styles.social}`} href="https://www.github.com/saile515" target="_blank">
				<Image src="/github.png" alt="Github Logo" layout="responsive" width={64} height={64} />
			</a>
			<a className={`${socialTW} ${styles.social}`} href="https://www.reddit.com/u/saile515" target="_blank">
				<Image src="/reddit.png" alt="Reddit Logo" layout="responsive" width={64} height={64} />
			</a>
			<a className={`${socialTW} ${styles.social}`} href="https://open.spotify.com/user/musicman515?si=73d7eb3c1c96473a" target="_blank">
				<Image src="/spotify.png" alt="Spotify Logo" layout="responsive" width={64} height={64} />
			</a>
		</div>
	);
}
