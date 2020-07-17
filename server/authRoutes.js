var express = require("express");
var authRoutes = express.Router();
var userapi = require("./api");
const multer = require("multer");
const mult = require("./mult");
var fs = require("fs");

authRoutes.post("/register", async (req, res) => {
	const newid = Math.floor(
		Date.now() * Math.random() * Math.random()
	).toString();

	fs.copyFile(
		"./public/user.jpg",
		`./public/profile/${newid}.jpg`,
		fs.constants.COPYFILE_EXCL,
		(err) => {
			if (err) {
				console.log("Error Found:", err);
			}
		}
	);

	const userData = {
		id: newid,
		username: req.body.userName,
		Email: req.body.Email,
		password: req.body.Password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		avatar: `/profile/${newid}.jpg`,
		description: "Please Update your details",
		sex: "please update your details",
	};

	let resultfromapi = await userapi
		.adduser(userData)
		.then((result) => {
			res.send(result);
		})
		.catch((error) => {
			res.send(error);
		});
});

authRoutes.post("/login", async (req, res) => {
	fs.rename(
		"/public/profile/img_6.png",
		`/public/profile/${13782}.jpg`,
		function (err) {
			if (err) console.log("ERROR: " + err);
		}
	);
	let userLogin = await userapi.loginuser(req.body.Email).then((data) => {
		if (data.length === 0) {
			res.send("User not registered");
		} else if (data[0].password === req.body.Password) {
			res.send({
				user: data[0],
				token: "csdokmcsmndvsodvjidjvsd" + Math.random() + Math.random(),
			});
		} else {
			res.send("Wrong password....!!");
		}
	});
});
authRoutes.post("/editDetails", async (req, res) => {
	console.log(req.body);
	const data = {
		Email: req.body.email,
		id: req.body.id,
		sex: req.body.sex,
		description: req.body.description,
	};

	const editDetails = userapi
		.setDetails(data)
		.then((newdata) => {
			res.send(newdata);
		})
		.catch((err) => res.send(err));
});

authRoutes.post(
	"/changepic",
	multer({ storage: mult.upload }).single("avatar"),
	(req, res) => {
		console.log("hello inside image");
		const data = {
			Email: req.body.email,
			id: req.body.id,
			avatar: "/profile/" + req.file.filename,
		};

		const changepic = userapi
			.changepic(data)
			.then((newdata) => {
				console.log("hello inside image", newdata);
				res.send(newdata);
			})
			.catch((err) => res.send(err));
	}
);

module.exports = authRoutes;
