var express = require("express");
var category = express.Router();
var userapi = require("./api");

category.post("/add", (req, res) => {
	const addcategory = userapi
		.addCategory(req.body.categoryName)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send(err);
		});
});

category.post("/get", async (req, res) => {
	const getcategory = await userapi
		.getCategory()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send(err);
		});
});

module.exports = category;
