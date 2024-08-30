require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
mongoose.set("strictQuery", false);

// express app
const app = express();

// middleware
app.use(
  cors({
    origin: "https://workoutbuddy-frontend-mv6w.onrender.com", // Replace with your actual frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// Root route handler
app.get("/", (req, res) => {
  res.send("Welcome to the Workout Buddy API!");
});

const port = process.env.PORT || 5000;

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(port, () => console.log(`listening for requests on ${port}!`));
  })
  .catch((err) => {
    console.log(err);
  });
