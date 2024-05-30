const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	name: { type: String, require: true },
	status: { type: String, require: true },
	email: { type: String, require: true },
	password: { type: String, require: true },
	account: { type: String, require: true },
	address: { type: String, require: true },
});
const users = mongoose.model("USER", userSchema);
module.exports = users;
