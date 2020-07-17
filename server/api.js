const db = require("./model");
var mongoose = require("mongoose");
const postdetails = require("./post_model");
const categoryModels = require("./categoryModel");

mongoose.set("useFindAndModify", false);

module.exports = {
	adduser: function (data, cb) {
		return new Promise((resolve, reject) => {
			new db(data).save(function (err, result) {
				if (err) {
					reject("User Already Registered please try to login with this email");
				} else {
					resolve("Registered Succesfully");
				}
			});
		});
	},

	loginuser: function (data, cb) {
		return new Promise((resolve, reject) => {
			db.find({ Email: data }, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},

	addPost: function (data, cb) {
		return new Promise((resolve, reject) => {
			new postdetails(data).save(function (err, result) {
				if (err) {
					reject(err);
				} else {
					console.log(result);
					resolve(result);
				}
			});
		});
	},

	getTimeline: function () {
		return new Promise((resolve, reject) => {
			postdetails.find((err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},

	setDetails: function (data) {
		return new Promise((resolve, reject) => {
			var query = { id: data.id };
			var update = { description: data.description, sex: data.sex };
			db.findOneAndUpdate(query, update, { new: true }, function (err, doc) {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(doc);
				}
			});
		});
	},

	changepic: function (data) {
		return new Promise((resolve, reject) => {
			var query = { id: data.id };
			var update = { avatar: data.avatar };
			db.findOneAndUpdate(query, update, { new: true }, function (err, doc) {
				if (err) {
					reject(err);
				} else {
					resolve(doc);
				}
			});
		});
	},

	addCategory: function (data) {
		return new Promise((resolve, reject) => {
			new categoryModels({ category: data }).save((err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	getCategory: function () {
		return new Promise((resolve, reject) => {
			categoryModels.find((err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},

	getpostdetails: function (data) {
		return new Promise((resolve, reject) => {
			postdetails.find({ id: data }, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},

	updatecomment: function (data) {
		return new Promise((resolve, reject) => {
			var id = parseInt(data.id, 10);

			postdetails.findOneAndUpdate(
				{ id: id },
				{
					$push: {
						comment: [
							{
								avatar: data.avatar,
								commentor: data.commentor,
								comment: data.comment,
								id: Date.now(),
							},
						],
					},
				},
				{
					new: true,
					returnOriginal: false,
					upsert: true,
				},
				(err, data) => {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				}
			);
		});
	},

	replycomment: function (data) {
		return new Promise((resolve, reject) => {
			var id = parseInt(data.commenton, 10);
			console.log("inside reply comment");
			postdetails.findOneAndUpdate(
				{ "comment.id": id },
				{
					$push: {
						reply: [
							{
								commenton: id,
								avatar: data.avatar,
								commentor: data.commentor,
								comment: data.comment,
								id: Date.now(),
							},
						],
					},
				},
				{
					new: true,
					returnOriginal: false,
					upsert: true,
				},
				(err, data) => {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						console.log(data);
						resolve(data);
					}
				}
			);
		});
	},

	likeupdate: function (data) {
		return new Promise((resolve, reject) => {
			var id = parseInt(data.id, 10);
			console.log(id);
			postdetails.findOneAndUpdate(
				{ id: id },
				{
					$push: {
						likes: [
							{
								id: data.userid,
							},
						],
					},
				},
				{
					new: true,
					returnOriginal: false,
					upsert: true,
				},
				(err, data) => {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						console.log(data);
						resolve(data);
					}
				}
			);
		});
	},

	likeremove: function (data) {
		return new Promise((resolve, reject) => {
			var id = parseInt(data.id, 10);
			console.log("inside relove like", data.email);
			postdetails.updateOne(
				{ id: id },
				{
					$pullAll: {
						likes: [
							{
								id: data.userid,
							},
						],
					},
				},
				(err, data) => {
					if (err) {
						console.log("err", err);
						reject(err);
					} else {
						console.log(data);
						resolve(data);
					}
				}
			);
		});
	},
};
