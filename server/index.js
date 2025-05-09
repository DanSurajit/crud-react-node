const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await prisma.task.findMany();
    res.status(200).json(allTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = await prisma.task.create({
      data: {
        task,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.delete("/tasks", async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.put("/tasks", async (req, res) => {
  try {
    const { id, task } = req.body;
    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        task,
      },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
