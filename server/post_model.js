const mongoose = require("mongoose");

var postModel = mongoose.Schema({
	author: { type: String },
	avatar: { type: String },
	title: { type: String },
	category: { type: String },
	date: { type: String },
	time: { type: String },
	image: { type: String },
	likes: {
		type: Array,
	},

	id: { type: Number },
	comment: Array,
	reply: Array,
});

var postdetails = mongoose.model("postdetails", postModel);

module.exports = postdetails;
