const Workout = require("../models/Workout");
const { errorHandler } = require('../auth');

module.exports.addWorkout = (req, res) => {
    let newWorkout = new Workout({
        name: req.body.name,
        duration: req.body.duration,
        status: req.body.status || "pending" // Use default if not provided
    });

    return Workout.findOne({ name: req.body.name }).then(existingWorkout => {
        if (existingWorkout) {
            return res.status(409).send({ message: 'Workout already exists' });
        } else {
            return newWorkout.save()
                .then(result => res.status(201).send({ 
                    success: true,
                    message: 'Workout added successfully',
                    result
                }))
                .catch(err => errorHandler(err, req, res));
        }
    })
    .catch(err => errorHandler(err, req, res));
};

module.exports.getAllWorkouts = (req, res) => {
    return Workout.find({}).then(result => {
        if (result.length > 0) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send({ message: 'No workouts found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.updateWorkout = (req, res) => {
    let updatedWorkout = {
        name: req.body.name,
        duration: req.body.duration,
        status: req.body.status
    };

    return Workout.findByIdAndUpdate(req.params.id, updatedWorkout, { new: true })
    .then(workout => {
        if (workout) {
            res.status(200).send({ success: true, message: 'Workout updated successfully', workout });
        } else {
            res.status(404).send({ message: 'Workout not found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.deleteWorkout = (req, res) => {
    return Workout.findByIdAndDelete(req.params.id)
        .then(workout => {
            if (workout) {
                res.status(200).send({ success: true, message: 'Workout deleted successfully' });
            } else {
                res.status(404).send({ message: 'Workout not found' });
            }
        })
        .catch(error => errorHandler(error, req, res));
};

module.exports.completeWorkout = (req, res) => {
    return Workout.findByIdAndUpdate(
        req.params.id,
        { status: "completed" },
        { new: true }
    )
    .then(workout => {
        if (workout) {
            res.status(200).send({ success: true, message: 'Workout marked as completed', workout });
        } else {
            res.status(404).send({ message: 'Workout not found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};