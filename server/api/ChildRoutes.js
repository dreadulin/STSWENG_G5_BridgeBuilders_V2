import {
  childSchemaServer,
  editChildSchema,
  editParentSchema,
} from "../../schemas/FormValidationSchema.js";
import Child from "../../schemas/ChildSchema.js";
import Father from "../../schemas/FatherSchema.js";
import Mother from "../../schemas/MotherSchema.js";
import express from "express";
import * as Yup from "yup";
import imageUploader from "../../src/utils/imageUploader.js";
import upload from "../../multer.js";

const apiRouter = express.Router();

//profile page
apiRouter.get("/profile/:caseNo", async (req, res) => {
  var kid;
  var nanay;
  var tatay;
  try {
    kid = await Child.findById(req.params.caseNo);
    console.log(kid.pangalan)

    nanay = await Mother.findOne({ pangalan: kid.nanay });
    console.log(nanay.pangalan)

    tatay = await Father.findOne({ pangalan: kid.tatay });
    console.log(nanay.pangalan)
    
    

    res.status(200).json(kid);
  } catch (error) {
    res.status(500).send("Error fetching children data");
  }
});

//save edited profile changes
apiRouter.post(
  "/editProfile/:caseNo",
  upload.single("picture"),
  async (req, res) => {
    const caseNo = req.params.caseNo;

    const profileData = req.body;

    try {
      if (profileData.goalsAchieved.length == 0) {
        profileData.goalsAchieved = [];
      } else {
        profileData.goalsAchieved = profileData.goalsAchieved.split(",");
      }
      await editChildSchema.validate(profileData, { abortEarly: false });

      if (req.file) {
        profileData.picture = await imageUploader(req.file);
      }

      await Child.updateOne({ _id: caseNo }, profileData);
      return res.status(200).json({ message: "Created child successfully" });
    } catch (error) {
      console.log("THERES ACTUALLY AN ERROR 0_0", error.message);
      if (error instanceof Yup.ValidationError) {
        // Validation failed
        const errors = error.inner.map((err) => err.message);
        console.log(errors);
        return res.status(400).json({ errors });
      }
    }
  }
);

//archive or unarchive profile
apiRouter.post("/archiveProfile/:caseNo", async (req, res) => {
  console.log("Editing case archive status...");
  const caseNo = parseInt(req.params.caseNo);

  const currentDocument = await Child.findById(caseNo);
  const newStatus = currentDocument.status === "Active" ? "Deleted" : "Active";

  try {
    await Child.updateOne({ _id: caseNo }, { $set: { status: newStatus } });
    res.status(200);
  } catch (error) {
    res.status(401).send("Error fetching case data");
  }
});

// Category filtering - overview
apiRouter.get("/overview", async (req, res) => {
  const { program, year, search, edad, kasarian } = req.query;

  let query = { program, status: "Active" };

  if (year) {
    query.yearAdmitted = year;
  }

  if (search) {
    query.pangalan = { $regex: search, $options: "i" };
  }

  if (edad) {
    const [minAge, maxAge] = edad.split("-").map(Number);
    query.edad = { $gte: minAge, $lte: maxAge };
  }

  if (kasarian) {
    query.kasarian = { $regex: kasarian, $options: "i" };
  }

  try {
    const children = await Child.find(query);
    res.status(200).json(children);
  } catch (error) {
    console.error("Error filtering children data:", error);
    res.status(500).send("Error filtering children data");
  }
});

// Category filtering - archive
apiRouter.get("/archive", async (req, res) => {
  const { program, year, search, edad, kasarian } = req.query;

  let query = { program, status: "Deleted" };

  if (year) {
    query.yearAdmitted = year;
  }

  if (search) {
    query.pangalan = { $regex: search, $options: "i" };
  }

  if (edad) {
    const [minAge, maxAge] = edad.split("-").map(Number);
    query.edad = { $gte: minAge, $lte: maxAge };
  }

  if (kasarian) {
    query.kasarian = { $regex: kasarian, $options: "i" };
  }

  try {
    const children = await Child.find(query);
    res.status(200).json(children);
  } catch (error) {
    console.error("Error filtering children data:", error);
    res.status(500).send("Error filtering children data");
  }
});

apiRouter.post("/intakeChild", async (req, res) => {
  try {
    const childData = req.body.childInfo;
    console.log(childData);
    // Validate the request body
    await childSchemaServer.validate(childData, { abortEarly: false });
    await Child.create(childData);

    res.status(200).json({ message: "Created child successfully" });
  } catch (error) {
    console.log("THERES ACTUALLY AN ERROR 0_0", error.message);
    if (error instanceof Yup.ValidationError) {
      // Validation failed
      const errors = error.inner.map((err) => err.message);
      console.log(errors);
      return res.status(400).json({ errors });
    }
  }
});

export default apiRouter;
