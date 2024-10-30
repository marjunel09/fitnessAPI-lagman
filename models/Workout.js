const mongoose = require("mongoose")

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name name is required"]
    },
    duration: {
        type: String,
        required: [true, "duration is required"]
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model("Workout", workoutSchema);