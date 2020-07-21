const multer = require("multer");
const path = require("path");

module.exports = {
	upload: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "public/profile");
		},
		filename: function (req, file, cb) {
			cb(null, req.body.id + path.extname(file.originalname));
		},
	}),

	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "public/uploads");
		},

		// By default, multer removes file extensions so let's add them back
		filename: function (req, file, cb) {
			cb(
				null,
				file.fieldname + "-" + Date.now() + path.extname(file.originalname)
			);
		},
	}),
};
