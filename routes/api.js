const router = require("express").Router();
const Workout = require("../models/index").Workout;

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
  
    .then((workouts) => { 
      res.json(workouts);
      console.log(workouts);
    })
    .catch((err) => res.json(err));
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
  
    .then(workout => res.json(workout))
    .catch(err => res.json(err));
});

router.post("/api/workouts", (req, res) => {
  Workout.create({
    day: Date.now()
  })
    .then(newWorkout => {
      console.log("o am the cretead worrkout: ", newWorkout);
      res.json(newWorkout);
    })
    .catch(err => res.json(err));
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
  .sort({ _id: -1 })
  .limit(7)
    .then(workouts => {
      res.json(workouts);
      console.log(workouts);
    })
    .catch(err => res.json(err));
});

router.delete("/api/workouts", (req, res) => {
  // I sawthe demand in the homework to add a delete route but i couldn't find this functoinality in the frontend
});

module.exports = router;