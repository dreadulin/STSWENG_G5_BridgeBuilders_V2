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
    console.log(tatay.pangalan)
    
    res.status(200).json(kid);
  } catch (error) {
    res.status(500).send("Error fetching children data");
  }
});

//save edited profile changes
apiRouter.post("/edit/:caseNo", upload.single("picture"), async (req, res) => {
  const caseNo = req.params.caseNo;

  const profileData = req.body;

  try {
    // Transforming goalsAchieved to an array if it's not empty
    if (profileData.goalsAchieved.length == 0) {
      profileData.goalsAchieved = [];
    } else {
      profileData.goalsAchieved = profileData.goalsAchieved.split(",");
    }

    // Transforming subgoals in the same way as goalsAchieved
    if (profileData.subgoals.length == 0) {
      profileData.subgoals = [];
    } else {
      profileData.subgoals = profileData.subgoals.split(",");
    }

    // Validate the profile data
    await editChildSchema.validate(profileData, { abortEarly: false });

    // If a picture was uploaded, handle it
    if (req.file) {
      profileData.picture = await imageUploader(req.file);
    }

    // Update the child record with the new profile data
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
});


apiRouter.post("saveSubgoal/:caseNo", async (req, res) => {
  const caseNo = req.params.caseNo;
  
  const { subgoal } = req.body;
  
  if (!subgoal) {
    return res.status(400).json({ error: "Subgoal missing" });
  }

  if (!caseNo) {
    return res.status(400).json({ error: "Case number is required" });
  }

  try {
    // Update the subgoals directly in the database without fetching the profileData
    const result = await Child.updateOne(
      { _id: caseNo },
      { $push: { subgoals: subgoal } }  // This will push the new subgoal into the array
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Profile not found or no changes made" });

    }

    return res.status(200).json({ message: "Subgoal saved successfully!" });

  } catch (err) {
    
    console.error("Error while saving subgoal:", err);
    return res.status(500).json({ error: "Failed to save subgoal" });
  }
});



apiRouter.post("saveSubgoal/:caseNo", async (req, res) => {
  const caseNo = req.params.caseNo;
  
  const { subgoal } = req.body;
  
  if (!subgoal) {
    return res.status(400).json({ error: "Subgoal missing" });
  }

  if (!caseNo) {
    return res.status(400).json({ error: "Case number is required" });
  }

  try {
    // Update the subgoals directly in the database without fetching the profileData
    const result = await Child.updateOne(
      { _id: caseNo },
      { $push: { subgoals: subgoal } }  // This will push the new subgoal into the array
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Profile not found or no changes made" });
    }

    return res.status(200).json({ message: "Subgoal saved successfully!" });

  } catch (err) {
    
    console.error("Error while saving subgoal:", err);
    return res.status(500).json({ error: "Failed to save subgoal" });
  }
});

// archive or unarchive profile
apiRouter.post("/archiveProfile/:caseNo", async (req, res) => {
  console.log("Editing case archive status...");
  const caseNo = (req.params.caseNo);

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

// Archive an attached file
apiRouter.post("/archiveFile/:caseNo/:fileId", async (req, res) => {
  console.log("Editing file archive status...");

  const caseNo = req.params.caseNo;   
  const fileId = req.params.fileId;   
  
  try {
    // Find the profile document 
    const currentDocument = await Child.findById(caseNo);

    if (!currentDocument) {
      return res.status(404).send("Case not found");
    }

    // Find the scpecific attached file on the profile
    const file = currentDocument.attachedFiles.find(file => file._id.toString() === fileId);

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Change file status
    file.fileStatus = file.fileStatus === "Active" ? "Deleted" : "Active";

    // Save the updated document
    await currentDocument.save();

    res.status(200).send("File archive status updated successfully");
  } catch (error) {
    console.error("Error updating file archive status:", error);
    res.status(500).send("Error updating file archive status");
  }
});

// Display filtered archived files
apiRouter.get("/archivedFiles", async (req, res) => {
  try {
    const { program, year, edad, kasarian } = req.query;

    let query = {};

    if (program) {
      query.program = program;
    }

    if (year) {
      query.yearAdmitted = year;
    }

    if (edad) {
      const [minAge, maxAge] = edad.split("-").map(Number);
      query.edad = { $gte: minAge, $lte: maxAge };
    }

    if (kasarian) {
      query.kasarian = { $regex: kasarian, $options: "i" };
    }

    const allProfiles = await Child.find(query);

    if (!allProfiles || allProfiles.length === 0) {
      return res.status(200).json([]); // Return an empty array
    }

    let archivedFiles = [];

    allProfiles.forEach(profileData => {
      const archived = profileData.attachedFiles
        .filter(file => file.fileStatus === "Deleted")
        .map(file => ({
          ...file.toObject(),
          caseNo: profileData._id,
          fileId: file._id,
          pangalan: profileData.pangalan,
          edad: profileData.edad,
          kasarian: profileData.kasarian,
        }));

      archivedFiles = archivedFiles.concat(archived);
    });

    // Return the filtered archived files
    res.status(200).json(archivedFiles);
  } catch (error) {
    console.error("Error retrieving archived files:", error);
    res.status(500).send("Error retrieving archived files");
  }
});

// Attach file to a profile
apiRouter.post("/profile/:caseNo/upload", upload.single("file"), async (req, res) => {
  const caseNo = req.params.caseNo;

  try {
    // Check if the file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Define file details
    const fileDetails = {
      fileName: req.file.originalname,
      filePath: req.file.path,  
      fileType: req.file.mimetype, // MIME type of the file (e.g., application/pdf, image/jpeg)
      uploadDate: new Date(), 
    };

    // Find the child profile and update with the file details
    await Child.updateOne(
      { _id: caseNo },
      { $push: { attachedFiles: fileDetails } }
    );

    res.status(200).json({ message: "File uploaded and attached to profile successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file");
  }
});


export default apiRouter;
