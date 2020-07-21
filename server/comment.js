var express = require("express");
var comment = express.Router();
var userapi = require("./api");

comment.post("/update", async (req, res) => {
	const updatecomment = await userapi
		.updatecomment(req.body)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.send(err));
});

comment.post("/reply", async (req, res) => {
	const replycomment = await userapi
		.replycomment(req.body)
		.then((data) => {
			console.log(data);
			res.send(data);
		})
		.catch((err) => res.send(err));
});
module.exports = comment;
