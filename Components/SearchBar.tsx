import { FormEvent } from "react";
import styles from "../styles/SearchBar.module.css";
import { useRouter } from "next/router";

export default function SearchBar() {
	const router = useRouter();
	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		if ((event.target as HTMLFormElement).input.value == "") return;
		router.push(`/search/${(event.target as HTMLFormElement).input.value}`);
		(event.target as HTMLFormElement).input.value = "";
	}

	return (
		<form autoComplete="off" onSubmit={handleSubmit} className={`${styles.container} bg-slate-700 rounded-full border-gray-900 border-solid`}>
			<input
				type="text"
				placeholder="Search"
				name="input"
				className={`${styles.input} h-full w-full bg-transparent border-none m-0 py-1 pl-4 text-xl text-white placeholder:text-slate-400 outline-none`}
			/>
			<input type="submit" value="" className={`${styles.submit} bg-transparent border-none`} />
		</form>
	);
}
