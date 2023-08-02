const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const Task = require("../models/Task");

// Create a new task

router.post(
  "/tasks",
  [
    body("title").notEmpty().withMessage("Title is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, completed } = req.body;
      const task = new Task({ title, description, completed });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Creating Task", error: error.message });
    }
  }
);

// fetch all created tasks

router.get("/tasks", async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
});

//  Update an already created task

router.put(
  "/tasks/:id",
  [
    body("title").notEmpty().withMessage("Title is Required"),
    body("description").notEmpty().withMessage("Description is Required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const id = req.params.id;
      const { title, description, completed } = req.body;
      const UpdatedTask = await Task.findByIdAndUpdate(
        id,
        {
          title,
          description,
          completed,
        },
        { new: true }
      );
      if (!UpdatedTask) {
        return res.status(404).json({ message: "Task Not Found" });
      }
      res.status(200).json(UpdatedTask);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Task could not be updated", error: error.message });
    }
  }
);

// delete a task

router.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "No such Task found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Task", error: error.message });
  }
});

module.exports = router;
