import {
  childSchemaServer,
  editChildSchema,
  editParentSchema,
} from "../../schemas/FormValidationSchema.js";
import Child from "../../schemas/ChildSchema.js";
import Father from "../../schemas/FatherSchema.js";
import Mother from "../../schemas/MotherSchema.js";
import Sibling from "../../schemas/SiblingSchema.js";
import Family from "../../schemas/FamilySchema.js";
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

// Add field to database
apiRouter.post('/addField', async (req, res) => {
  const { fieldName, fieldSection } = req.body;

  console.log("Name: ", fieldName);
  console.log("Section: ", fieldSection);

  try {
    const fieldValue = "";

    // Check which schema (model) to update based on sectionActive
    let schemaToUpdate;

    switch (fieldSection) {
      case 's1':
        schemaToUpdate = Child;
        break;
      case 's2':
        schemaToUpdate = Child;
        break;
      case 's3':
        schemaToUpdate = Mother;
        break;
      case 's4':
        schemaToUpdate = Father;
        break;
      case 's5':
        schemaToUpdate = Sibling;
        break;
      case 's6':
        schemaToUpdate = Child;
        break;
      case 's7':
        schemaToUpdate = Family;
        break;
      default:
        return res.status(400).json({ message: "Invalid section specified" });
    }

    // Find the document in the appropriate collection (schema)
    const document = await schemaToUpdate.findOne({});

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Ensure the dynamicFields array is initialized (if not already)
    if (!document.dynamicFields) {
      document.dynamicFields = [];
    }

    // Add the new field to the dynamicFields array
    document.dynamicFields.push({
      fieldName: fieldName,
      fieldValue: fieldValue,
    });

    // Save the updated document
    await document.save();

    return res.status(200).json({ message: "Field added successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while adding the field" });
  }
});




// Get the newly added fields
apiRouter.get('/getSectionData', async (req, res) => {
  const { section, fieldName } = req.query; // Assume section identifies the document and fieldName specifies the desired dynamic field
  console.log('Request received for /api/getSectionData with:', req.query);

  try {
    let result;

     // Adjust query to handle section properly
    if (section === 's3') {
      result = await Mother.findOne({ section: req.query.section }).select('dynamicFields');
    } else {
      result = await Child.findOne({ section: req.query.section }).select('dynamicFields');
    }

    console.log('Database result:', result);

    if (!result || !result.dynamicFields || result.dynamicFields.length === 0) {
      return res.status(404).json({ message: 'Field not found' });
    }

    res.json(result.dynamicFields); // Return the matched field(s)
  } catch (error) {
    console.error("Error fetching dynamic field:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});









// Endpoint to fetch child data
apiRouter.get('/getChildData', async (req, res) => {
  try {
    const childData = await Child.findOne(); // Or another query to fetch the data
    res.json(childData);
  } catch (error) {
    res.status(500).send('Error fetching child data');
  }
});


 
/*

apiRouter.post('/addField', async (req, res) => {
  const { fieldName, fieldValue, fieldSection } = req.body;

  try {
    // Ensure fieldValue defaults to an empty string if not provided
    const value = fieldValue || "";

    // Find all children (or add your condition to filter specific children)
    const children = await Child.find({});

    if (!children || children.length === 0) {
      return res.status(404).json({ message: "No children found" });
    }

    // Iterate over all children and add the new field
    for (let child of children) {
      // Ensure dynamicFields is initialized if it's not defined
      if (!child.dynamicFields) {
        child.dynamicFields = []; // Initialize as an empty array if not present
      }

      // Add the new dynamic field as an object with fieldName and fieldValue
      child.dynamicFields.push({
        fieldName: fieldName,
        fieldValue: value,
        fieldSection: fieldSection
      });

      await child.save();
    }

    return res.status(200).json({ message: "Field added successfully to all children" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while adding the field" }); 
  }
});

*/



apiRouter.get("/api/getFields", async (req, res) => {
  try {
    const fields = await Child.find(); // Replace `FieldModel` with your database model
    res.json({ fields });
  } catch (error) {
    console.error("Error fetching fields:", error);
    res.status(500).json({ message: "Failed to fetch fields" });
  }
});


apiRouter.get("/s1-fields", async (req, res) => {
  try {
    const fields = await Child.find(); // Fetch all fields for Section 1
    res.json(fields); // Send the fields as a JSON response
  } catch (err) {
    res.status(500).json({ message: "Error fetching Section 1 fields", error: err });
  }
});

apiRouter.get("/s2-fields", async (req, res) => {
  try {
    const fields = await Child.find(); // Fetch all fields for Section 1
    res.json(fields); // Send the fields as a JSON response
  } catch (err) {
    res.status(500).json({ message: "Error fetching Section 1 fields", error: err });
  }
});





export default apiRouter;
