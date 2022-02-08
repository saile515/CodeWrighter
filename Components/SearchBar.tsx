import styles from "../styles/SearchBar.module.css";

export default function SearchBar() {
	return (
		<form className={`${styles.container} bg-slate-700 rounded-full border-gray-900 border-solid`}>
			<input type="text" placeholder="Search" className={`${styles.input} h-full w-full bg-transparent border-none m-0 py-1 pl-4 text-xl text-white placeholder:text-slate-400 outline-none`} />
			<input type="submit" value="" className={`${styles.submit} bg-transparent border-none`} />
		</form>
	);
}