const mongoose = require("mongoose");

const pplSchema = mongoose.Schema({
	username: { type: String },
	password: { type: String },
	Email: {
		type: String,
		unique: true,
		index: true,
	},
	id: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	avatar: { type: String },
	description: { type: String },
	sex: { type: String },
});
const db = mongoose.model("user", pplSchema);
module.exports = db;
