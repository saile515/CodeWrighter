// If anyone ever reads this, I am not proud of this code, and I deeply regret embedding the post in an iframe.

function media() {
	const h1 = document.getElementsByTagName("h1");
	const h2 = document.getElementsByTagName("h2");
	const h3 = document.getElementsByTagName("h3");
	const h4 = document.getElementsByTagName("h4");
	const h5 = document.getElementsByTagName("h5");
	const h6 = document.getElementsByTagName("h6");
	if (parent.document.body.clientWidth < 800) {
		document.body.style.fontSize = "1.2rem";

		for (let i = 0; i < h1.length; i++) h1[i].style.fontSize = "2.5rem";
		for (let i = 0; i < h2.length; i++) h2[i].style.fontSize = "1.75rem";
		for (let i = 0; i < h3.length; i++) h3[i].style.fontSize = "1.5rem";
		for (let i = 0; i < h4.length; i++) h4[i].style.fontSize = "1.2rem";
		for (let i = 0; i < h5.length; i++) h5[i].style.fontSize = "1rem";
		for (let i = 0; i < h6.length; i++) h6[i].style.fontSize = "0.833rem";
	} else {
		document.body.style.fontSize = "2rem";

		for (let i = 0; i < h1.length; i++) h1[i].style.fontSize = "3.8rem";
		for (let i = 0; i < h2.length; i++) h2[i].style.fontSize = "2.875rem";
		for (let i = 0; i < h3.length; i++) h3[i].style.fontSize = "2.5rem";
		for (let i = 0; i < h4.length; i++) h4[i].style.fontSize = "2.125rem";
		for (let i = 0; i < h5.length; i++) h5[i].style.fontSize = "1.75rem";
		for (let i = 0; i < h6.length; i++) h6[i].style.fontSize = "1.5rem";
	}
}

window.onload = media;
window.addEventListener("resize", media);

hljs.highlightAll();
