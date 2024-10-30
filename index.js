const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin:admin1234@lagmandb.c5k81.mongodb.net/workout-management-app?retryWrites=true&w=majority&appName=LagmanDB");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Now connected to MongoDB Atlas"));

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};