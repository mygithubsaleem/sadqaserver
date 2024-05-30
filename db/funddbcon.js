const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose.set("strictQuery", false);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("donor db connection established.. fund ... fund...");
	})
	.catch((err) => {
		console.log(err);
	});
