const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const { urlencoded, json } = require("body-parser");

// make the schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: String,
    minLength: 10
  }
});

// make the model
const Note = mongoose.model("note", noteSchema);

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());

// add some routes

app.get("/note", async (req, res) => {
  //this is where you would do your mongo stuff
  // most of the time you would have your models in another file and you would jst require them
  // but we are just going to do everything in this one file

  //first get all the notes
  const notes = await Note.find({})
    .lean() //this is optimisation stuff
    .exec();
  res.status(200).json(notes); //send back the status code 200 and the notes as json
});

//create a note

app.post("/note", async (req, res) => {
  const noteToBeCreated = req.body;
  const note = await Note.create(noteToBeCreated);
  res.status(201).json(note.toJSON());
});

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatever");
};

//connect to database and start server

connect()
  .then(async connection => {
    app.listen(5000);
    console.log("sever started and listening on port 5000");
  })
  .catch(e => console.error(e));
