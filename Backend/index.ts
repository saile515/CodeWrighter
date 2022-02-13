import express from "express";
import { fetchData } from "./fetchGithubData.js";
import fs from "fs";

const app = express();
const port = 8888;

app.get("/posts/", (req, res) => {
	fs.readFile(`${process.env.DATABASE}/posts.json`, "utf-8", (err, data) => {
		if (err) res.send("Error");
		res.send(data);
	});
});

app.get("/commits/", (req, res) => {
	fs.readFile(`${process.env.DATABASE}/commits.json`, "utf-8", (err, data) => {
		if (err) res.send("Error");
		res.send(data);
	});
});

app.get("/post/:id", (req, res) => {
	fs.readFile(`${process.env.DATABASE}/PostsOutput/${req.params.id}.txt`, "utf-8", (err, data) => {
		if (err) res.send("Post not found!");
		res.send(data);
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

fetchData();
