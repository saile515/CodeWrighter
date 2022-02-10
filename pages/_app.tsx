import "../styles/globals.css";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} className=" bg-slate-900" />;
}

export default App;
