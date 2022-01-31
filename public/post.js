function media() {
	const width = screen.width;
	const height = screen.height;

	if (width <= 800 && width > 300 && width / height < 0.8) {
		document.documentElement.style.fontSize = `${width / 90}vw`;
	}

	if (width <= 300 && width / height < 0.8) {
		document.documentElement.style.fontSize = `${width / 65}vw`;
	}
}

// window.onload = media;
// window.addEventListener("resize", media);

hljs.highlightAll();
