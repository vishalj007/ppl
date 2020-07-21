var express = require("express");
var feed = express.Router();
var userapi = require("./api");
const multer = require("multer");
const mult = require("./mult");

feed.post(
	"/upload",
	multer({ storage: mult.storage }).single("file"),
	async (req, res) => {
		var today = new Date();
		var month = new Array();
		month[0] = "Jan";
		month[1] = "Feb";
		month[2] = "Mar";
		month[3] = "Apr";
		month[4] = "May";
		month[5] = "Jun";
		month[6] = "Jul";
		month[7] = "Aug";
		month[8] = "Sep";
		month[9] = "Oct";
		month[10] = "Nov";
		month[11] = "Dec";
		var date =
			today.getDate() +
			" " +
			month[today.getMonth()] +
			" " +
			today.getFullYear();
		var time =
			today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

		const data = {
			author: req.body.author,
			avatar: req.body.avatar,
			title: req.body.title,
			category: req.body.category,
			date: date,
			time: time,
			image: "uploads/" + req.file.filename,
			userid: req.file.id,
			id: Date.now(),
		};

		let uploadpostnow = await userapi
			.addPost(data)
			.then((response) => res.send(response))
			.catch((err) => {
				res.send(err);
			});
	}
);

feed.post("/gettimeline", async (req, res) => {
	const getTimeline = await userapi
		.getTimeline()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => res.send(err));
});

feed.post("/getdetails", async (req, res) => {
	var id = parseInt(req.body.id, 10);

	const getpostdetails = await userapi
		.getpostdetails(id)
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
});
module.exports = feed;
