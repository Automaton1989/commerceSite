let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let session = require("express-session");
let cors  = require("cors");
let bcrypt = require("bcrypt");

let indexRouter = require("./routes/index");

let app = express();

app.use(cors({credentials: true, origin: true}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if(process.env.NODE_ENV === "production") {
	app.use(express.static("front/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "front", "build", "index.html"));
	})
}
app.use(express.static(path.join(__dirname, "front/build")));

app.use(
	session({
		secret: "info for commerceSite project",
		resave: false,
		saveUninitialized: true,
	})
);

app.use("/api", indexRouter);

module.exports = app;
