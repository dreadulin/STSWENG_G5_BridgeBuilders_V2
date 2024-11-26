import mongoose from "mongoose";

const MotherSchema = new mongoose.Schema(
  {
    pangalan: { type: String },
    palayaw: { type: String },
    kasarian: { type: String }, //male or female
    edad: { type: Number },
    birthday: { type: String }, //petsa ng kapanganakan
    lugarNgKapanganakan: { type: String }, //lugar ng kapanganakan
    relihiyon: { type: String },
    antasNgPaaralan: { type: String }, //Kasalukuyan/Naabot na Antas ng Paaralan + list
    hulingPaaralangPinasukan: { type: String }, //huling paaralang pinasukan
    tirahan: { type: String }, //kasalukuyang tirahan (current address)
    probinsya: { type: String },
    trabaho: { type: String },
    kita: { type: Number },
    skillTraining: { type: String }, //skill training attended
    skills: { type: String },
    dokumento: [{ type: String }],
    dynamicFields: {
      type: [{
        fieldName: String,
        fieldValue: String,
      }],
      default: [],
    },
  },
  { versionKey: false }
);

const Mother = mongoose.model("Mother", MotherSchema);
export default mongoose.models.Mother || Mother;
