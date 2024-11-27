import mongoose from "mongoose";

const LabelSchema = new mongoose.Schema({
  label: { type: String, required: true },
  valueKey: { type: Number, default: 0 },
});

const StatsSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  goals: {
    General: { type: [LabelSchema], default: [] },
    Goal1: { type: [LabelSchema], default: [] },
    Goal2: { type: [LabelSchema], default: [] },
    Goal3: { type: [LabelSchema], default: [] },
  },
});

const Stats = mongoose.model("Stats", StatsSchema);
export default mongoose.models.Stats || Stats;
