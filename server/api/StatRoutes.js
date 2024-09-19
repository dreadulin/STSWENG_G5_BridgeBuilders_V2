import Stats from "../../schemas/StatSchema.js";
import express from "express";

const apiRouter = express.Router();

// Route to get distinct years
apiRouter.get("/years", async (req, res) => {
  try {
    console.log("Fetching distinct years...");
    const years = await Stats.distinct("year");
    console.log("Years fetched:", years);
    res.json(years);
  } catch (error) {
    console.error("Error fetching years:", error);
    res.status(500).json({ error: "Failed to fetch years" });
  }
});

// Route to delete a specific year
apiRouter.delete("/years/:year", async (req, res) => {
  try {
    const { year } = req.params;

    const existingStats = await Stats.findOne({ year });
    if (!existingStats) {
      return res.status(404).json({ error: "Year not found" });
    }

    await Stats.deleteOne({ year });
    res.status(200).json({ message: "Year deleted successfully" });
  } catch (error) {
    console.error("Error deleting year:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get statistics for a specific year
apiRouter.get("/stats/:year", async (req, res) => {
  try {
    const { year } = req.params;
    const stats = await Stats.findOne({ year });
    if (!stats) {
      return res
        .status(404)
        .json({ error: "Statistics for the year not found" });
    }
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update label name and value key for a specific label
apiRouter.put(
  "/stats/:year/goals/:category/label/:label",
  async (req, res) => {
    try {
      const { year, category, label } = req.params;
      const { newLabel, newValue } = req.body;

      const stats = await Stats.findOne({ year });
      if (!stats) {
        return res
          .status(404)
          .json({ error: "Statistics for the year not found" });
      }

      const goalCategory = stats.goals[category];
      if (!goalCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      const labelToUpdate = goalCategory.find((item) => item.label === label);
      if (!labelToUpdate) {
        return res.status(404).json({ error: "Label not found" });
      }

      labelToUpdate.label = newLabel;
      labelToUpdate.valueKey = newValue;

      await stats.save();
      res.status(200).json({ message: "Label updated successfully" });
    } catch (error) {
      console.error("Error updating label:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Create a new statistic entry
apiRouter.post("/stats", async (req, res) => {
  try {
    const { year, goals } = req.body;

    if (!year || !goals) {
      return res.status(400).json({ error: "Year and goals are required" });
    }

    let existingStats = await Stats.findOne({ year });
    if (existingStats) {
      return res
        .status(400)
        .json({ error: "Statistic entry for the year already exists" });
    }

    const newStats = new Stats({
      year,
      goals,
    });

    await newStats.save();
    res.status(201).json({
      message: "Statistic entry created successfully",
      stats: newStats,
    });
  } catch (error) {
    console.error("Error creating statistic entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a label to a specific goal and year
apiRouter.post("/stats/:year/goals/:category/label", async (req, res) => {
  try {
    const { year, category } = req.params;
    const { label, valueKey } = req.body;

    if (!label || valueKey === undefined) {
      return res.status(400).json({ error: "Label and valueKey are required" });
    }

    const stats = await Stats.findOne({ year });
    if (!stats) {
      return res
        .status(404)
        .json({ error: "Statistics for the year not found" });
    }

    const goalCategory = stats.goals[category];
    if (!goalCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    goalCategory.push({ label, valueKey });

    await stats.save();
    res.status(200).json({ message: "Label added successfully" });
  } catch (error) {
    console.error("Error adding label:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a label from a specific goal and year
apiRouter.delete(
  "/stats/:year/goals/:category/label/:label",
  async (req, res) => {
    try {
      const { year, category, label } = req.params;

      const stats = await Stats.findOne({ year });
      if (!stats) {
        return res
          .status(404)
          .json({ error: "Statistics for the year not found" });
      }

      const goalCategory = stats.goals[category];
      if (!goalCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      const labelToDeleteIndex = goalCategory.findIndex(
        (item) => item.label === label
      );
      if (labelToDeleteIndex === -1) {
        return res.status(404).json({ error: "Label not found" });
      }

      goalCategory.splice(labelToDeleteIndex, 1);

      await stats.save();
      res.status(200).json({ message: "Label deleted successfully" });
    } catch (error) {
      console.error("Error deleting label:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default apiRouter;
