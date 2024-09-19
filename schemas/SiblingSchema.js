import mongoose from "mongoose";

const SiblingSchema = new mongoose.Schema(
  {
    kapatidIndex: { type: Number },
    pangalan: { type: String },
    kasarian: { type: String }, //male or female
    edad: { type: Number },
    antasNgPaaralan: { type: String }, //antas ng edukasyon + list
    trabaho: { type: String },
    kita: { type: Number },
    //with birth certificate, boolean or file upload
  },
  { versionKey: false }
);

const Sibling = mongoose.model("Sibling", SiblingSchema);
export default mongoose.models.Sibling || Sibling;
