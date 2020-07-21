var express = require("express");
var likes = express.Router();
var userapi = require("./api");

likes.post("/update", async (req, res) => {
	const likeupdate = await userapi
		.likeupdate(req.body)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.send(err));
});

likes.post("/remove", async (req, res) => {
	const likeremove = await userapi
		.likeremove(req.body)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.send(err));
});

module.exports = likes;
