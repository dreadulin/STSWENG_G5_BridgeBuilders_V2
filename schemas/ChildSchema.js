import mongoose from "mongoose";

const ChildSchema = new mongoose.Schema(
  {
    program: { type: String }, //HC or CBP
    date: { type: Date, default: Date.now },
    caseNo: { type: Number }, //unique id
    pangalan: { type: String },
    edad: { type: Number },
    birthday: { type: String }, //petsa ng kapanganakan
    relihiyon: { type: String },
    antasNgPaaralan: { type: String }, //Kasalukuyan/Naabot na Antas ng Paaralan + list
    palayaw: { type: String },
    kasarian: { type: String },
    lugarNgKapanganakan: { type: String },
    hulingPaaralangPinasukan: { type: String }, //huling paaralang pinasukan
    tirahan: { type: String }, //area
    problema: [{ type: String }],
    allergy: { type: String },
    dokumento: [{ type: String }],
    vaccine: { type: String },
    initialNaItsura: [{ type: String }],
    kategorya: {
      pangalan: { type: String },
      ngo: { type: String },
      lgu: { type: String },
    }, //kategoryang kinapapalooban
    nanay: { type: String },
    tatay: { type: String },
    kapatid: [{ type: String }],
    yearAdmitted: {
      type: Number,
      default: function () {
        return new Date().getFullYear();
      },
    },
    picture: { type: String, default: "" },
    status: { type: String, default: "Active" },
    goalsAchieved: [{ type: String }],
    subgoals: [{ type: String }]
  },
  { versionKey: false }
);

const Child = mongoose.model("Child", ChildSchema);
export default mongoose.models.Child || Child;
