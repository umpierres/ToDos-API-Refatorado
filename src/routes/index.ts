import express from "express";
import { NoteController, UserController } from "../controllers";
import { validateCreateNote, validateDataUser, validateUpdateNote, validateUserLogin } from "../middlewares";

const app = express.Router();

app.get('/', (req, res) => res.status(200).json({ message: 'OK' }));

// user
const userController = new UserController();

app.post("/users/signup", validateDataUser, userController.signup)
app.post("/users/signin", validateUserLogin, userController.signin)

//notes
const noteController = new NoteController();

app.post("/notes/:ownerID", validateCreateNote, noteController.create)
app.get("/notes/:ownerID/", noteController.listNotes)
app.put("/notes/:ownerID/:noteID", validateUpdateNote, noteController.update)
app.put("/notes/:ownerID/:noteID/archive", noteController.archive)
app.put("/notes/:ownerID/:noteID/favorite", noteController.favorite)
app.delete("/notes/:ownerID/:noteID", noteController.delete)

export default app;